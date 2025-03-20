

//данные подключения к БД
import {auth_key, base_name} from "../ServerData.js";
//сервер
import express from "express";

import Airtable from "airtable-node";
import {reFormaterResponseData} from "../ServerDataFunction.js";

/*
* работа с роутом (уникальным путем коннтроллера)
* UserController: получение информации о пользователях
 */
const router = express.Router();

// Инициализация Airtable
const airtable = new Airtable({apiKey: auth_key})
    .base(base_name)
    .table("users");


/*
    description: Маршрут для получения списка всех пользователей
    router: http://localhost:3010/api/users/
    type: get
*/
router.get('/', (req, res) => {
    airtable
        .list({})
        .then(resp => {
            try {
                // Преобразуем данные для ответа
                const records = reFormaterResponseData(resp.records);

                // Отправляем данные клиенту
                res.json(records);
            } catch (err) {
                console.error("Ошибка при обработке данных:", err);
                res.status(500).json({error: "Ошибка при обработке данных"});
            }
        })
        .catch((err) => {
            console.error("Ошибка при получении данных из Airtable:", err);
            res.status(500).json({error: "Ошибка при получении данных из Airtable"});
        });
});

/*
    description: Маршрут для поиска пользователя по логину и паролю
    router: http://localhost:3010/api/users/login?login={login}&password={password}
    type: get
*/
router.get("/login", (req, res) => {
    const {login, password} = req.query;

    // Проверка наличия обязательных полей
    if (!login || !password) {
        //Возврат ошибки, если хотя бы одно из полей не заполнено
        return res.status(400).json({message: "Не заполнены обязательные поля"});
    }

    // Поиск пользователя по логину и паролю
    airtable
        .list({
            //Передача зачений для поиска
            filterByFormula: `AND({Login} = '${login}', {Password} = '${password}')`, // Исправленная формула
            maxRecords: 1, // Ограничиваем результат одной записью
        })
        .then(resp => {
            if (resp.error)
                return res.status(404).json({message: "Произошла ошибка сервера"});
            if (resp.records.length > 0) {
                // Пользователь найден
                const user = reFormaterResponseData(resp.records)[0];
                return res.status(200).json({message: "Успешный вход", user});
            } else {
                // Пользователь не найден
                return res.status(404).json({message: "Неверный логин или пароль"});
            }
        })
        .catch((err) => {
            console.error("Ошибка при запросе к Airtable:", err);
            return res.status(500).json({message: "Ошибка сервера"});
        });
});

/*
    description: Маршрут для получения информации о пользоыателе по его ID
    router: http://localhost:3010/api/users/{userId}
    type: get
*/
router.get("/:userId", (req, res) => {
    const {userId} = req.params;
    airtable
        .list({
        filterByFormula: `{ID} = '${userId}'`, // Фильтр по ID пользователя'
            maxRecords: 1, // Ограничиваем результат одной записью
    })
        .then(resp => {
            if (resp.error)
                return res.status(404).json({message: "Произошла ошибка сервера"});
            if (resp.records.length > 0) {
                // Пользователь найден
                const user = reFormaterResponseData(resp.records)[0];
                return res.status(200).json(user);
            } else {
                // Пользователь не найден
                return res.status(404).json({message: "Пользователь не найден"});
            }
        })
})
export default router;