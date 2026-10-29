# Три примера сайтов

В папке лежат три самостоятельные страницы из отчёта:

- `examples/izicity/index.html` - IziCity;
- `examples/aipimedia/index.html` - AiPiMedia;
- `examples/viadigital/index.html` - ViaDigital.

## Как открыть на компьютере

Откройте любой `index.html` двойным щелчком. Для проверки кнопок можно запустить простой локальный сервер в этой папке:

```bash
python -m http.server 8000
```

После этого страницы будут доступны по адресам:

- `http://localhost:8000/examples/izicity/`
- `http://localhost:8000/examples/aipimedia/`
- `http://localhost:8000/examples/viadigital/`

## Как разместить на GitHub Pages

Загрузите содержимое этой папки в новый репозиторий. В настройках репозитория откройте `Settings → Pages`, выберите публикацию из ветки `main` и папки `/root`. После публикации адреса будут выглядеть так:

```text
https://ВАШ-ЛОГИН.github.io/ИМЯ-РЕПОЗИТОРИЯ/examples/izicity/
https://ВАШ-ЛОГИН.github.io/ИМЯ-РЕПОЗИТОРИЯ/examples/aipimedia/
https://ВАШ-ЛОГИН.github.io/ИМЯ-РЕПОЗИТОРИЯ/examples/viadigital/
```

В PDF сейчас указаны пути внутри этой папки. Когда появится адрес репозитория, его можно вставить в последнюю страницу отчёта.
