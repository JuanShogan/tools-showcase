@echo off
rem ============================================================
rem  Push this site to GitHub.
rem
rem  IMPORTANT: pure ASCII only. cmd.exe reads .bat files with the
rem  ANSI codepage (GBK), so UTF-8 Chinese here turns into garbage
rem  that cmd tries to run as a command. All Chinese text is
rem  printed by this script via chcp 65001 + echo of ASCII only.
rem ============================================================

chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo  ============================================
echo   Push site to GitHub  /  tui song dao GitHub
echo  ============================================
echo.

if not exist ".git" (
    echo  [ERROR] Not a git repository: %~dp0
    echo.
    pause
    exit /b 1
)

rem ---- current remote ----
set "CUR="
for /f "delims=" %%i in ('git remote get-url origin 2^>nul') do set "CUR=%%i"

if defined CUR (
    echo  Current remote: !CUR!
    echo.
    set /p "NEWURL=Press ENTER to keep it, or paste a NEW repo URL: "
) else (
    echo  No remote configured yet.
    echo.
    set "NEWURL="
)

if not "!NEWURL!"=="" (
    git remote remove origin >nul 2>&1
    git remote add origin "!NEWURL!"
    echo  Remote set to: !NEWURL!
    echo.
) else if not defined CUR (
    echo  Please paste your GitHub repository URL
    echo  Example: https://github.com/yourname/tools-showcase.git
    echo.
    set /p "NEWURL=Repo URL: "
    if "!NEWURL!"=="" (
        echo  [ERROR] No URL given. Aborted.
        pause
        exit /b 1
    )
    git remote add origin "!NEWURL!"
    echo  Remote set to: !NEWURL!
    echo.
)

echo  --- git status ---
git status --short
echo.

echo  --- pushing to GitHub (a browser window may open for login) ---
git push -u origin main
set "RC=%ERRORLEVEL%"
echo.

if "%RC%"=="0" (
    echo  ============================================
    echo   DONE!  Refresh your GitHub repo page.
    echo  ============================================
    echo.
    echo   Cloudflare Pages will redeploy automatically
    echo   if you already connected it.
) else (
    echo  ============================================
    echo   PUSH FAILED  ^(exit code %RC%^)
    echo  ============================================
    echo.
    echo   Common causes:
    echo    1. The repo does not exist yet - create it at
    echo       https://github.com/new   ^(do NOT add README^)
    echo    2. Login not finished - the browser window must be
    echo       authorized, then run this script again.
    echo    3. Wrong URL - it must end with .git
)

echo.
pause
endlocal
exit /b %RC%
