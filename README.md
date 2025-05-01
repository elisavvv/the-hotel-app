# HotelApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Hotel Booking Application

![Логотип отеля](src/assets/logo.svg)

Приложение для бронирования номеров в отеле с возможностью просмотра услуг и онлайн-бронирования.

## 🚀 Технологии и библиотеки

- **Frontend**: 
  - Angular 17+
  - TypeScript
  - Standalone Components
  - Reactive Forms
  - Router
  - HTTP Client

- **Стилизация**:
  - CSS3
  - Flexbox/Grid
  - Адаптивный дизайн

## 📋 Функционал

- Просмотр номеров отеля с фильтрацией
- Детальная информация по каждому номеру
- Система бронирования с валидацией
- Просмотр дополнительных услуг (SPA, трансфер)
- Адаптивный интерфейс

## 🛠 Установка и запуск

1. **Клонировать репозиторий**:
   ```bash
   git clone https://github.com/elisavvv/the-hotel-app.git
   cd the-hotel-app
2. Установить зависимости:

   ```bash
   npm install

3. Запустить сервер разработки:
   ```bash
   ng serve
Приложение будет доступно по адресу: http://localhost:4200/

4. Сборка для production:

   ```bash
   ng build --configuration production

5. Структура проекта
src/
├── app/
│   ├── app.component.*            # Главный компонент
│   ├── app.config.ts              # Конфигурация приложения
│   ├── app.routes.ts              # Маршрутизация
│   ├── booking/                   # Модуль бронирования
│   ├── hotel/                     # Компоненты отеля
│   ├── hotel-rooms/               # Компоненты номеров
│   ├── housing-location/          # Карточки номеров
│   └── services/                  # Дополнительные услуги
├── assets/                        # Статические ресурсы
│   ├── images/                    # Изображения
│   └── logo.svg                   # Логотип
└── styles.css                     # Глобальные стили

Особенности реализации

Компонентный подход:

Standalone компоненты
Четкое разделение ответственности

Формы бронирования:

Валидация в реальном времени
Обработка ошибок
Визуальная обратная связь

Сервисы:

HotelService для работы с данными
Mock API с задержкой для имитации сервера

Адаптивность:

Гибкая сетка (CSS Grid)
Медиа-запросы для мобильных устройств
