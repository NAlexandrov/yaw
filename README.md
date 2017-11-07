# Yet Another Wallet
[![Build Status](https://travis-ci.org/NAlexandrov/yaw.svg?branch=master)](https://travis-ci.org/NAlexandrov/yaw)
[![codecov](https://codecov.io/gh/NAlexandrov/yaw/branch/master/graph/badge.svg)](https://codecov.io/gh/NAlexandrov/yaw)
[![dependencies Status](https://david-dm.org/NAlexandrov/yaw/status.svg)](https://david-dm.org/NAlexandrov/yaw)

Данное приложение было специально создано для [Школы Node.js](https://academy.yandex.ru/events/frontend/spb-2017/) в рамках хакатона.

### Установка
1. Скачайте приложение ```git clone https://github.com/NAlexandrov/yaw```
2. Установите все зависимости ```npm install```
3. Запустите Webpack ```WATCH=1 npm run build```
4. Запустите приложение ```npm start```
5. Откройте http://localhost:8000

P.S. Приложение работает с базой данных MongoDB. Перед запуском приложения, убедитесь, что у вас создана пустая база данных по адресу ```mongodb://localhost/school-wallet```. Изменить настройки базы данных можно в файле ```./config/development.env```

### Возможности приложения

1. Проведение операций по добавленным картам.
![](http://yet-another-wallet.herokuapp.com/screenshots/index.png)
2. Добавление новых карт.
![](http://yet-another-wallet.herokuapp.com/screenshots/newcard.png)
3. Определение оператора телефона на который было осуществлено пополнение.
![](http://yet-another-wallet.herokuapp.com/screenshots/phone.png)
4. Выгрузка отчетов по транзакциям в форматы DOCX, PDF, XLSX.
5. Авторизация через социальные сети.
6. Подготовлена среда для написания тестов, в том числе snapshot тестов компонентов React.js. Подробнее [тут](https://facebook.github.io/jest/docs/en/snapshot-testing.html).
7. Настроен CI с помощью [Travis](https://travis-ci.org) и автоматический деплой на [Heroku](https://www.heroku.com/)

### Прочее

1. Весь код приведен к единому стилю.
2. Установлены хуки на прекомит, которые запрещают комитеть код, не соответствующий заданному стилю.
3. Запуск микросервисов реализован через [pm2](https://github.com/Unitech/PM2/).
4. При конфигурировании роутов можно задавать параметры валидации входящих и исходящий данных через [Joi](https://www.npmjs.com/package/joi).
