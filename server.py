import http.server
import socketserver
import os

PORT = 3333
ROOT = os.path.join(os.path.dirname(__file__), "widget")

# Проверяем, существует ли папка
if not os.path.exists(ROOT):
    print(f"Ошибка: Папка '{ROOT}' не найдена!")
    print(f"Текущая директория: {os.getcwd()}")
    exit(1)

os.chdir(ROOT)

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Сервер запущен на http://localhost:{PORT}")
    print(f"Обслуживаемая папка: {ROOT}")
    print("Нажмите Ctrl+C для остановки")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nСервер остановлен")