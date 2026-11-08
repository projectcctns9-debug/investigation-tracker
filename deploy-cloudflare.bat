@echo off
TITLE Deploy CCTNS Tracker to Cloudflare Pages
echo =====================================================================
echo    CLOUDFLARE PAGES DEPLOYMENT (.pages.dev)
echo    CCTNS Investigation Tracker - Live Cloud Deployment
echo =====================================================================
echo.

cd /d "%~dp0frontend"

echo [1/2] Building production bundle (Vite + Tailwind)...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed! Please check errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Deploying to Cloudflare Pages (Project: investigation-tracker)...
echo.
echo If this is your first time, Cloudflare will open a browser to log in.
echo.
call npx --yes wrangler pages deploy dist --project-name=investigation-tracker

echo.
echo =====================================================================
echo Deployment completed! Your live URL will appear above (*.pages.dev)
echo =====================================================================
pause
