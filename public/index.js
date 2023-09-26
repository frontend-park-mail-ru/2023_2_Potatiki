import MainPage from "./src/pages/main-page/main-page.js";

const root = document.getElementById('root');
console.log("root")

const renderMainPage = () => {
    const main = new MainPage(root);
    main.render();
};

renderMainPage();