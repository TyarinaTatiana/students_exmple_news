/*
* Функция переводя первоо симыоля в строчный вариант
*/
export function lowerCaseFirstLetter(str) {
    return str[0].toLowerCase() + str.slice(1);
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