@echo off
echo ==============================================
echo   Starting Drjerrri Poly Clinic React Server...
echo ==============================================
cd /d "%~dp0"
start http://localhost:5173
npm run dev
pause
