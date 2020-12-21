import App from './App.svelte';

const app = new App({
	target: document.body,
});


app.use(express.static("public/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/build", "index.html"));
});


export default app;