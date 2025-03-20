import express from "express";
import cors from "cors";


const app = express();
//Указываем порт
const port = 3010;
// Middleware
app.use(cors()); // Разрешаем запросы с фронтенда
app.use(express.json()); // Для обработки JSON-тела запросов

(async () => {
    //В дальнейшем тут будут прописаны контроллеры запросов

    const {default: UserController} = await import('./controller/UserController.js');
    app.use('/api/users', UserController);

    app.listen(3000, () => { //Подключение сервера
        console.log('Server is running on port 3000');
    });
})();