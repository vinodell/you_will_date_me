export const activities = [
  {
    id: "restaurant",
    title: "Покушать",
    detail: "Столик, ты и я, вкусная еда",
    icon: "🍝",
    color: "peach",
  },
  {
    id: "walk",
    title: "Прогулка",
    detail: "Свежий воздух и тёплые напитки",
    icon: "☕",
    color: "sage",
  },
];

export const buttonLabels = {
  yes: "Да, конечно!",
  no: "Неет",
  chooseDate: "Перейдем к дате",
  edit: "Изменить",
  back: "Назад",
  startOver: "Начать заново",
};

export const telegramApi = "https://worker.max-khamitov.workers.dev/send-date";
export const WEB_ACCESS_KEY = import.meta.env.VITE_WEB_ACCESS_KEY;
