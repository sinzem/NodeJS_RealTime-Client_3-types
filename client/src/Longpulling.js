import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Longpulling = () => {

    const [messages, setMessages] = useState([]); /* (массив для сообщений) */
    const [value, setValue] = useState(''); /* (для данных из инпута) */
    // const [subscrState, setSubscrState] = useState(0);

    useEffect(() => { /* (при загрузке запускается функция подписки(подается запрос и висит до получения ответа или пока время не закончится, после(в любом из вариантов) автоматически перезапустится)) */
        subscribe();
    }, [])

    const subscribe = async () => { /* (функция запроса - подписка) */
        // let a = subscrState + 1;
        // setSubscrState(a);
        // console.log(subscrState);
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages'); /* (запрос на эндпоинт) */
            // console.log(data);
            setMessages(prev => [data, ...prev]); /* (добавляем полученный ответ в состояния(массив сообщений)) */
            await subscribe(); /* (перезапускаем запрос) */
        } catch (e) {
            setTimeout(() => {
                subscribe(); /* (перезапускаем запрос в случае ошибки - скорее всего по истечению времени запроса) */
            }, 500);
        }
    }

    const sendMessage = async () => { /* (функция для отправки сообщения(value из инпута) на сервер(добавляем к адресу эндпоинт), навешиваем на кнопку) */
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        }) ;
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