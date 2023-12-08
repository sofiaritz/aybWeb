import "./app.css"
import "pattern.css/dist/pattern.min.css"
import App from "./App.svelte"

const app = new App({
	target: document.getElementById("app"),
})

export default app
