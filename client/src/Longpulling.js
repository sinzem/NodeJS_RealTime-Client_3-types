import React, { useState } from 'react';
import axios from 'axios';

const Longpulling = () => {

    const [messages, setMessages] = useState([]); /* (массив для сообщений) */
    const [value, setValue] = useState(''); /* (для данных из инпута) */

    const sendMessage = async () => { /* (функция для отправки сообщения(value из инпута) на сервер(добавляем к адресу эндпоинт), навешиваем на кнопку) */
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
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

export default Longpulling;