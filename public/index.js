import Button from "./src/components/button/button.js";

const root = document.getElementById('root');
const button = new Button(root);
button.render({'text': 'Hello mir'});