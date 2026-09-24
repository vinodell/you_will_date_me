import dateTableImage from "./assets/datetable.jpg";
import moscowImage from "./assets/moscow.JPG";
import saintPetersburgImage from "./assets/saintp_2.jpg";
import walkingImage from "./assets/walking.jpg";
import type { Activity, City } from "./features/date-invitation";

export const activities: readonly Activity[] = [
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

export const cities: readonly City[] = [
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
  back: "Назад",
  edit: "Изменить",
  startOver: "Начать заново",
  chooseLocation: "Выбрать локацию",
} as const;

export const telegramApi = "https://worker.max-khamitov.workers.dev/send-date";
