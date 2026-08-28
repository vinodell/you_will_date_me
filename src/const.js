import dateTableImage from "./assets/datetable.jpg";
import moscowImage from "./assets/moscow.JPG";
import saintPetersburgImage from "./assets/saintp_2.jpg";
import walkingImage from "./assets/walking.jpg";

export const activities = [
  {
    id: "restaurant",
    title: "Покушать",
    detail: "Столик, ты и я, вкусная еда",
    icon: dateTableImage,
    color: "peach",
  },
  {
    id: "walk",
    title: "Прогулка",
    detail: "Свежий воздух и тёплые напитки",
    icon: walkingImage,
    color: "sage",
  },
];

export const cities = [
  {
    id: "moscow",
    title: "Москва",
    image: moscowImage,
  },
  {
    id: "saint-petersburg",
    title: "Санкт-Петербург",
    image: saintPetersburgImage,
  },
];

export const buttonLabels = {
  yes: "Да, конечно!",
  no: "Неет",
  chooseDate: "Перейдем к дате",
  edit: "Изменить",
  back: "Назад",
  startOver: "Начать заново",
  chooseLocation: "Выбрать локацию"
};

export const telegramApi = "https://worker.max-khamitov.workers.dev/send-date";
export const WEB_ACCESS_KEY = import.meta.env.VITE_WEB_ACCESS_KEY;
