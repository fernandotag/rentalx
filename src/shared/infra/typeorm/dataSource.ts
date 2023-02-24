import { DataSource } from "typeorm";

export default (host = "127.0.0.1"): DataSource => {
  const dataSource = new DataSource({
    type: "postgres",
    host,
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    synchronize: false,
    logging: false,
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    subscribers: [],
  });

  return dataSource;
};
