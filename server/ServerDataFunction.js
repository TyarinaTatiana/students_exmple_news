/*
* Функция переводя первого символа в строчный вариант
*/
export function lowerCaseFirstLetter(str) {
    return str[0].toLowerCase() + str.slice(1);
}

/*Функция перевода первого символа в прописной вариант*/
export function upperCaseFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}


/* Функция подготовки данных для отправки на бек.
* Что бы AirTable корректно принял данные, необходимо, что бы первые символы ключей элемента совпадали с ключами присланными от AirTable
* */
export function reformaterBodyData(obj) {
    if(!obj?.length) return [];
    return obj.map(record => {
        const fields = {};

        for (const key of Object.keys(record)) {
            if (typeof record[key] === "object") {
                fields[upperCaseFirstLetter(key)] = record[key];
            } else if (typeof record[key] === "string" || typeof record[key] === "number") {
                fields[upperCaseFirstLetter(key)] = record[key];
            }
        }
        return {
            ...fields,
        };

    })
}
// Обработка возвращенного массива данных, приведение к единому формату
export function reFormaterResponseData(obj){
    console.log(obj);
    return obj.map(record => {
        const fields = {};
        console.log(record.fields);
        for (const key of Object.keys(record.fields)) {
            if (typeof record.fields[key] === "object") {
                fields[lowerCaseFirstLetter(key)] = record.fields[key];
            } else if (typeof record.fields[key] === "string" || typeof record.fields[key] === "number") {
                fields[lowerCaseFirstLetter(key)] = record.fields[key];
            }
        }
        console.log(fields);
        return {
            customId: record.id,
            ...fields,
        };
    });
}