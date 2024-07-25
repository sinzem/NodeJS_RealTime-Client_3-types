import React, { useEffect, useState, } from 'react';
import axios from 'axios';

const EventSourcing = () => {

    const [messages, setMessages] = useState([]); /* (массив для сообщений) */
    const [value, setValue] = useState(''); /* (для данных из инпута) */

    useEffect(() => { /* (при загрузке запускается функция подписки - постоянный гет-запрос) */
        subscribe();
    }, []) 

    const subscribe = async () => { /* (функция запроса - подписка) */
        const eventSource = new EventSource(`http://localhost:5000/connect`); /* (слздаем экземпляр встроенного класса, коннектим к порту) */
        eventSource.onmessage = function (event) { /* (полученное с сервера сообщение добавляем в массив с сообщениями) */ 
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }


    const sendMessage = async () => { /* (функция для отправки сообщения(value из инпута) на сервер(добавляем к адресу эндпоинт), навешиваем на кнопку) */
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        }) ;
        setValue('');
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" /> 
                    <button onClick={sendMessage}>Send</button>
                </div> 
                <div className="messages">
                    {messages.map(mess => 
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventSourcing;

