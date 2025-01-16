import { $host } from "./index";

export const fetchPsIM = async () => {
    try {
        const response = await $host.get(process.env.REACT_APP_API_URL+'api/playerinmatch');
        const players = response.data; //  Backend возвращает массив напрямую
        return players; // Возвращаем массив
    } catch (error) {
        console.error("Error fetching heroes:", error);
        return []; //  Лучше возвращать пустой массив в случае ошибки
    }
};
export const fetchPIM = async (PlayerId) => {
    try {
        console.log(`Fetching hero with ID: ${PlayerId}`);  // Логирование ID
        const response = await $host.get(process.env.REACT_APP_API_URL+`api/playerinmatch/${PlayerId}`);
        console.log('Response from server:', response);  // Логируем ответ
        const player = response.data;  // Предполагаем, что сервер возвращает один объект героя
        return player;  // Возвращаем объект
    } catch (error) {
        console.error("Error fetching hero:", error);
        return null;  // Возвращаем null в случае ошибки
    }
};
export const fetchSomePIM = async (matchId) => {
    try {
        console.log(`Fetching hero with ID: ${matchId}`);  // Логирование ID
        const response = await $host.get(process.env.REACT_APP_API_URL+`api/playerinmatch/inmatch/${matchId}`);
        console.log('Response from server:', response);  // Логируем ответ
        return response.data;  // Предполагаем, что сервер возвращает один объект героя // Возвращаем объект
    } catch (error) {
        console.error("Error fetching hero:", error);
        return null;  // Возвращаем null в случае ошибки
    }
};


