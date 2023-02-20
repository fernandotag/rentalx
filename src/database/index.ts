import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
});

dataSource
  .initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => {
    console.log(err);
  });
