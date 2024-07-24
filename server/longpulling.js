const express = require('express');
const cors = require('cors');
const events = require('events'); /* (для работы с событиями, встроенный) */

const PORT = 5000;

const emitter = new events.EventEmitter(); /* (для работы с событиями) */

const app = express();

app.use(cors());

/* (создаем эндпоинты) */
app.get('get-messages', (req, res) => { /* (первым пишем путь запроса, далее cb-функция) */
    emitter.once('newMessage', (message) => { /* (рассылаем на гет-запросы(постоянно висят в ожидании) полученное в post сообщение - получаем чат(один прислал сообщение - сервер разослал на всех подключенных)) */
        res.json(message);
    })
})

app.post('new-messages', (req, res) => {
    const message = req.body; /* (получаем из пост-запроса сообщение) */
    emitter.emit('newMessage', message); /* (передаем на рассылку в гет-эндпоинт(по имени)) */
    res.status(200);
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

