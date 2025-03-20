export const API_BASE_URL = "http://localhost:3000/api"; // Базовый URL вашего API

// Общая функция для выполнения запросов
export async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error({
                ...response,
                message: `Ошибка: ${response.status} ${response.statusText}`
            });
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        throw error;
    }
}