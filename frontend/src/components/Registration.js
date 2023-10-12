import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

function Registration() {

    const [data, setData] = useState({
        username: " ",
        password: " ",
        role: "user"
    });
    const navigate = useNavigate()


    const redirectToAnotherPage = () => {
        navigate('/main')// Перенаправление на другую страницу
    };

    const sendDataToServer = () => {
        fetch('/auth/registration', {
            method: 'POST',
            body: JSON.stringify(data), // Отправляем данные на сервер в формате JSON
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('Ответ от сервера:', responseData.message);

                if (responseData.message === 0) {
                    redirectToAnotherPage()
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке данных на сервер:', error);
            });
    };

    function edit(prop, event) {
        setData({...data, ...{[prop]: event.target.value}});
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <input
                type="text"
                placeholder="Введите имя"
                value={data.username}
                onChange={event => edit('username', event)}
            />
            <input
                type="text"
                placeholder="Введите пароль"
                value={data.password}
                onChange={event => edit('password', event)}
            />
            <button onClick={sendDataToServer}>Отправить данные на сервер</button>
            <Link to="/login">
                <button>Зайти через логин</button>
            </Link>
        </div>
    );
}

export default Registration;

