const express = require('express');
const cors = require('cors');
const events = require('events'); /* (для работы с событиями, встроенный) */

const PORT = 5000;

const emitter = new events.EventEmitter(); /* (для работы с событиями) */

const app = express();

app.use(cors());
app.use(express.json());

/* (создаем эндпоинты) */
app.get('/connect', (req, res) => { /* (первым пишем путь запроса, далее cb-функция) */
    res.writeHead(200, { /* (настраиваем заголовки) */
        'Connection': 'keep-alive', /* (сохраняем постоянное подключение) */
        'Content-Type': 'text/event-stream', /* (текстовый контент) */
        'Cache-Control': 'no-cache' /* (отключаем кеширование) */
    })
    emitter.on('newMessage', (message) => { /* (отправляем пришедшее с post сообщение на все гет-запросы) */
        res.write(`data: ${JSON.stringify(message)} \n\n`); /* (обязательный формат строки ответа - начинается с data, заканчивается двумя переносами строки, насчет json не понял? - выше указывали текстовый контент) */
        console.log(message, "to client");
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body; /* (получаем из пост-запроса сообщение) */
    emitter.emit('newMessage', message); /* (передаем на рассылку в гет-эндпоинт(по имени)) */
    console.log(message, "from client");
    res.status(200).json("ok"); /* (обязательно завершаем операцию(автор закончил на статусе, без ответа - это ламало все приложение)) */
}))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



