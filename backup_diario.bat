@echo off
setlocal

:: Carpeta donde guardaremos los backups
set BACKUP_DIR=C:\Users\gemao\mongo_backups

:: Crear carpeta si no existe
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Fecha actual (año-mes-día)
set DATE=%DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2%

:: Comando de backup
mongodump --uri="mongodb+srv://gema:Ottoxotto22@cluster0.u5x5jxf.mongodb.net/" --out "%BACKUP_DIR%\%DATE%"

:: Borrar backups de más de 14 días
forfiles /p "%BACKUP_DIR%" /m * /d -14 /c "cmd /c rd /s /q @path"

echo Backup completado.

endlocal
