import { $host } from "./index";

export const fetchTeams = async () => {
    try {
        const response = await $host.get(process.env.REACT_APP_API_URL+'api/team');
        const teams = response.data; //  Backend возвращает массив напрямую
        return teams; // Возвращаем массив
    } catch (error) {
        console.error("Error fetching teams:", error);
        return []; //  Лучше возвращать пустой массив в случае ошибки
    }
};
export const fetchTeam = async (TeamId) => {
    try {
        console.log(`Fetching hero with ID: ${TeamId}`);  // Логирование ID
        const response = await $host.get(process.env.REACT_APP_API_URL+`api/team/${TeamId}`);
        console.log('Response from server:', response);  // Логируем ответ
        const team = response.data;  // Предполагаем, что сервер возвращает один объект героя
        return team;  // Возвращаем объект
    } catch (error) {
        console.error("Error fetching hero:", error);
        return null;  // Возвращаем null в случае ошибки
    }
};


