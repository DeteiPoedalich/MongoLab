import { $host } from "./index";

export const fetchHeroes = async () => {
    try {
        const response = await $host.get(process.env.REACT_APP_API_URL+'api/heroes');
        const heroes = response.data; //  Backend возвращает массив напрямую
        return heroes; // Возвращаем массив
    } catch (error) {
        console.error("Error fetching heroes:", error);
        return []; //  Лучше возвращать пустой массив в случае ошибки
    }
};
export const fetchHeroById = async (HeroId) => {
    try {
        console.log(`Fetching hero with ID: ${HeroId}`);  // Логирование ID
        const response = await $host.get(process.env.REACT_APP_API_URL+`api/heroes/${HeroId}`);
        console.log('Response from server:', response);  // Логируем ответ
        const hero = response.data;  // Предполагаем, что сервер возвращает один объект героя
        return hero;  // Возвращаем объект
    } catch (error) {
        console.error("Error fetching hero:", error);
        return null;  // Возвращаем null в случае ошибки
    }
};


