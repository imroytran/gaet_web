@echo off
echo Cleaning up unused components...

REM Create backup directories
mkdir backup\ui 2>nul
mkdir backup\custom 2>nul

REM Backup files before deletion
echo Backing up files...
copy src\components\ui\carousel.tsx backup\ui\ 2>nul
copy src\components\ui\command.tsx backup\ui\ 2>nul
copy src\components\ui\context-menu.tsx backup\ui\ 2>nul
copy src\components\ui\input-otp.tsx backup\ui\ 2>nul
copy src\components\ui\resizable.tsx backup\ui\ 2>nul
copy src\components\ui\menubar.tsx backup\ui\ 2>nul
copy src\components\custom\TestConnectionDialog.tsx backup\custom\ 2>nul

REM Delete unused components
echo Deleting unused components...
del src\components\ui\carousel.tsx 2>nul
del src\components\ui\command.tsx 2>nul
del src\components\ui\context-menu.tsx 2>nul
del src\components\ui\input-otp.tsx 2>nul
del src\components\ui\resizable.tsx 2>nul
del src\components\ui\menubar.tsx 2>nul
del src\components\custom\TestConnectionDialog.tsx 2>nul

echo Cleanup complete!
echo.
echo Now run: npm run clean
echo To reinstall dependencies without the removed packages.
pause
