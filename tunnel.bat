@echo off
TITLE Cloudflare Live Public Tunnel
echo =====================================================================
echo    CLOUDFLARE LIVE TUNNEL (Instant Public Testing URL)
echo    CCTNS Investigation Tracker - Live Mobile / Remote Access
echo =====================================================================
echo.
echo Make sure your frontend is running on http://localhost:5174 (via start.bat).
echo.
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:5174
pause
