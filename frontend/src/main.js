import App from "./App.svelte";

// console.log("test console from main");
// fetch("http://localhost:8080/wp-json")
//     .then(res => res.json())
//     .then(data => console.log(data));
const app = new App({
    target: document.body,
    intro: true
});

export default app;
