const ws = require('ws'); /* (подключаем модуль для вебсокета(вместо http теперь ws)) */

const wss = new ws.Server({  /* (создаем ws сервер) */
    port: 5000,   
}, () => console.log(`Server ws started on 5000`));

wss.on('connection', function connection(ws) { /* (навешиваем обработчик на событие подключения) */
    // ws.send(`Пользователь ${message.name} подключился`); /* (пример простого оповещения пользователя с помощью send(message.name нужно извлечь как в примере ниже)) */
    // let id = Date.now(); /* (можно добавить id для создания сессии или чата) */
    ws.on('message', function (message) { /* (при подключении с клиента будет отправляться сообщение, навешиваем обработчик, текст сообщения будет формироваться на стороне клиента, в д.с это будут поля с типом соединения, id, датой, именем пользователя и текстом сообщения) */
        message = JSON.parse(message); /* (переганяем из json) */
        switch (message.event) { /* (при отправке сообщения с клиента будет добавляться тип соответственно запросу, например connection при подключении и message при отправке сообщения - проверяем и даем соответствующий ответ) */
            case 'message': 
                broadcastMessage(message);
                break;
            case 'connection': 
                broadcastMessage(message);
                break;
        }
    })
})

function broadcastMessage(message, /* id */) { /* (функция для рассылки сообщения на всех подключенных клиентов, можно добавить id для создания сессии или чата и прописать условие рассылки только на клиентов этого чата) */
    wss.clients.forEach(client => { /* (подключенные находятся в массиве clients - перебираем и отправляем сообжение в формате json) */
        // if (client.id === id) {
            client.send(JSON.stringify(message));
        // } 
    })
}