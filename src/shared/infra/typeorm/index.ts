import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
  synchronize: false,
  logging: false,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  subscribers: [],
});

export { dataSource };
