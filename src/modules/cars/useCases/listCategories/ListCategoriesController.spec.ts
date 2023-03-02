import { hash } from "bcrypt";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import { dataSource } from "@shared/infra/typeorm";

describe("List Category Controller", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });

  beforeEach(async () => {
    await dataSource.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await dataSource
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

  afterEach(async () => {
    await dataSource.dropDatabase();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Sport",
        description: "Sport category",
      })
      .set({
        Authorization: `Bearer ${token as string}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Sport");
  });
});
