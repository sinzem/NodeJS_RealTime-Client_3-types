import React, { useEffect, useRef, useState, } from 'react';

const WebSock = () => { /* (не называем WebSocket полностью, иначе названия с дальнейшим подключением класса конфликтуют) */

    const [messages, setMessages] = useState([]); /* (массив для сообщений) */
    const [value, setValue] = useState(''); /* (для данных из инпута) */
    const [connected, setConnected] = useState(false); /* (cостояние подключения) */
    const [username, setUsername] = useState('');
    const socket = useRef(); /* (создаем сокет с помощью рефа, чтобы не обрывался при рендерах) */

    function connect() {
        socket.current = new WebSocket(`ws://localhost:5000`); /* (при нажатии на кнопку в форме, когда ввели имя, создаем подключение(на ws вместо http)) */
        /* (навешиваем слушатели на события соединения, сообщения, закрытия и ошибки) */
        socket.current.onopen = () => { /* (при подключении) */
            setConnected(true); /* (меняем состояние подключения, от него зависит, какая форма рендерится) */
            const message = {
                event: 'connection',
                username,
                id: Date.now(),
            } /* (создаем сообщение с информацией о клиенте и типе подключения) */
            // console.log("Подключение установлено");
            socket.current.send(JSON.stringify(message)); /* (отправляем на сервер) */
        }
        socket.current.onmessage = (event) => { /* (событие получения сообщения с сервера) */
            const message = JSON.parse(event.data); /* (переганяем полученное сообщение) */
            setMessages(prev => [message, ...prev]); /* (добавляем в массив с сообщениями(развертываем старые ...prev, без этого просто запишется одно новое сообщение)) */ 
        }
        socket.current.onclose = () => {
            
        }
        socket.current.onerror = () => {
            
        }
    }

    const sendMessage = async () => { /* (функция для отправки сообщения(value из инпута) на сервер, навешиваем на кнопку) */
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }; /* (составляем обьект сообщения) */
        socket.current.send(JSON.stringify(message)); /* (отправляем на сервер) */
        setValue(''); /* (очищаем инпут) */
    }

    if (!connected) { /* (если подключение еще не установлено, выводим форму для введения имени пользователя) */
        return (
            <div className="center">
                <div className="form">
                    <input 
                        value={username} 
                        placeholder="Введите ваше имя"
                        onChange={e => setUsername(e.target.value)} 
                        type="text"  
                    />
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
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
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className='connection_message'>Пользователь {mess.username} подключился</div> 
                                : <div className='message'>{mess.username}. {mess.message}</div>
                            } 
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;

