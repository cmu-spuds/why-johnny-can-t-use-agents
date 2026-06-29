#!/usr/bin/env python3
"""Live-reloading preview server for poster.tex.

Watches poster.tex; on every save it rebuilds poster.pdf with xelatex and the
browser page auto-reloads the PDF as soon as the new build lands.

Usage:  python3 _liveserver.py [port]   (default port 8123)
Then open http://localhost:8123 in a browser.
"""
import http.server
import os
import socketserver
import subprocess
import sys
import threading
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
TEX = HERE / "poster.tex"
PDF = HERE / "poster.pdf"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8123

# Shared build state surfaced to the browser via /status.
_state = {"building": False, "ok": True, "msg": "idle", "rev": 0}


def build():
    """Run a single xelatex pass; capture success/failure for the UI."""
    _state["building"] = True
    _state["msg"] = "building…"
    try:
        proc = subprocess.run(
            ["xelatex", "-interaction=nonstopmode", "-halt-on-error", "poster.tex"],
            cwd=HERE, capture_output=True, text=True, timeout=300,
        )
        ok = proc.returncode == 0 and PDF.exists()
        _state["ok"] = ok
        if ok:
            _state["msg"] = "ok"
            _state["rev"] += 1
        else:
            # Surface the first LaTeX error line so it shows in the browser.
            err = next((l for l in proc.stdout.splitlines() if l.startswith("!")),
                       "build failed")
            _state["msg"] = err
    except subprocess.TimeoutExpired:
        _state["ok"] = False
        _state["msg"] = "build timed out"
    finally:
        _state["building"] = False


def watcher():
    """Poll poster.tex mtime; rebuild on change."""
    last = TEX.stat().st_mtime if TEX.exists() else 0
    build()  # initial build so the page has something to show
    while True:
        time.sleep(0.5)
        try:
            m = TEX.stat().st_mtime
        except FileNotFoundError:
            continue
        if m != last:
            last = m
            time.sleep(0.2)  # let the editor finish writing
            build()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(HERE), **kw)

    def log_message(self, *a):
        pass  # quiet

    def do_GET(self):
        if self.path.startswith("/status"):
            body = (
                '{"building":%s,"ok":%s,"rev":%d,"msg":%s}'
                % ("true" if _state["building"] else "false",
                   "true" if _state["ok"] else "false",
                   _state["rev"],
                   _json_str(_state["msg"]))
            ).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path == "/" or self.path.startswith("/index"):
            body = INDEX_HTML.encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        # Never cache the PDF so reloads always fetch the fresh build.
        if self.path.startswith("/poster.pdf"):
            self.send_header_cache = True
        return super().do_GET()

    def end_headers(self):
        if self.path.startswith("/poster.pdf"):
            self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


def _json_str(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


INDEX_HTML = """<!doctype html>
<html><head><meta charset="utf-8"><title>poster — live</title>
<style>
  html,body{margin:0;height:100%;background:#3a3733;font-family:-apple-system,system-ui,sans-serif}
  #bar{position:fixed;top:0;left:0;right:0;height:34px;display:flex;align-items:center;
       gap:12px;padding:0 14px;background:#1a1a1a;color:#f5efe3;font-size:13px;z-index:10}
  #dot{width:10px;height:10px;border-radius:50%;background:#5DAB94;transition:background .2s}
  #dot.building{background:#E0A23A}
  #dot.err{background:#C2474A}
  #msg{opacity:.8}
  #stamp{margin-left:auto;opacity:.5;font-variant-numeric:tabular-nums}
  iframe{position:fixed;top:34px;left:0;right:0;bottom:0;width:100%;height:calc(100% - 34px);border:0;background:#3a3733}
</style></head>
<body>
  <div id="bar">
    <span id="dot"></span>
    <b>poster.pdf</b>
    <span id="msg">connecting…</span>
    <span id="stamp"></span>
  </div>
  <iframe id="pdf" src="poster.pdf"></iframe>
<script>
  const dot=document.getElementById('dot'),msg=document.getElementById('msg'),
        stamp=document.getElementById('stamp'),frame=document.getElementById('pdf');
  let rev=-1;
  function fmt(){const d=new Date();return d.toLocaleTimeString();}
  async function poll(){
    try{
      const r=await fetch('/status?_='+Date.now(),{cache:'no-store'});
      const s=await r.json();
      dot.className = s.building ? 'building' : (s.ok ? '' : 'err');
      msg.textContent = s.building ? 'rebuilding…' : (s.ok ? 'up to date' : s.msg);
      if(!s.building && s.ok && s.rev!==rev){
        if(rev!==-1){ // reload PDF on a new successful build (skip first load)
          frame.src='poster.pdf?v='+s.rev;
          stamp.textContent='reloaded '+fmt();
        }
        rev=s.rev;
      }
    }catch(e){ dot.className='err'; msg.textContent='server offline'; }
  }
  setInterval(poll,700); poll();
</script>
</body></html>
"""


def main():
    threading.Thread(target=watcher, daemon=True).start()
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Live poster preview: http://localhost:{PORT}")
        print(f"Watching {TEX.name} — save it and the browser reloads automatically.")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
