@echo off
echo =========================================
echo Запуск локального сервера Python
echo =========================================

REM Показываем текущую папку
echo Текущая папка: %cd%
echo.

REM Проверяем наличие Python
C:\Users\veb\AppData\Local\Programs\Python\Python311\python.exe --version >nul 2>&1
if errorlevel 1 (
    echo ОШИБКА: Python не найден!
    echo Установите Python с https://python.org
    pause
    exit /b 1
)

REM Показываем версию Python
C:\Users\veb\AppData\Local\Programs\Python\Python311\python.exe --version

REM Проверяем наличие server.py
if not exist "server.py" (
    echo ОШИБКА: Файл server.py не найден!
    dir *.py
    pause
    exit /b 1
)

echo.
echo Запускаем server.py...
echo.

REM Запускаем сервер
C:\Users\veb\AppData\Local\Programs\Python\Python311\python.exe server.py

echo.
echo Сервер остановлен.
pause