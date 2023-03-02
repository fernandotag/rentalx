import { dataSource } from "../typeorm";
import { app } from "./app";

dataSource
  .initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3333, () => {
  console.log("Server is running");
});
