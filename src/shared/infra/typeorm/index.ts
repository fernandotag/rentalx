import { join } from "path";
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
  migrations: [join(__dirname, "/migrations/*.{ts,js}")],
  entities: [join(__dirname, "../../../modules/**/entities/*.{ts,js}")],
  subscribers: [],
});

export { dataSource };
