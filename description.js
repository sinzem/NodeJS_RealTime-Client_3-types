// Виды клиент-сервер
    // Long pulling - самый прстой и наименее надежный способ, клиент отправляет гет-запрос на сервер и он висит в ожидании(если время вышло - повторяется), если на сервере произошло событие(например кто-то запостил), происходит ответ на подключенные гет-запросы
    // Event source(server sent events) - постоянное http-соединение, одностороннее(от сервера клиенту)
    // WebSocket - постоянное ws-соединение(не http), обмен данными во все стороны, но самое ресурсоемкое

// Client    
    // npx create-react-app my-app - создаем новое приложение, удаляем лишнее
    // npm i axios
    // npm start - запуск

// Server
    // npm init -y - быстрая инициализация
    // npm i express cors ws nodemon

    // longpulling.js - запуск npm run start

    // Пример работы Long pulling в документах с соответствующими названиями в server и client - все работает, но при первом запросе клиента срабатывает двойной запрос, после обновления страницы все работает нормально