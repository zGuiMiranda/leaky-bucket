import app from "./app";

const PORT = 9001;

app.server.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
