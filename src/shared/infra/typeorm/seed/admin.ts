import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import DataSourceConnection from "../dataSource";

const dataSource = DataSourceConnection("127.0.0.1");

async function create(): Promise<void> {
  const id = uuidV4();
  const password = await hash("admin", 8);

  await dataSource.initialize().then(() => {
    console.log("Data Source has been initialized!\n");
    dataSource
      .transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
          `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license )
          values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `
        );
      })
      .catch(() => {
        console.log("User admin registration error!");
      });
  });
}

create()
  .then(() => {
    console.log("An user admin has been created.");
  })
  .catch(() => {
    console.log("User admin registration error!");
  });
