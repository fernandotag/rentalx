import DataSourceConnection from "./dataSource";

const dataSource = DataSourceConnection("127.0.0.1");

dataSource
  .initialize()
  .then(async () => {
    console.log("Initializing the database...");
  })
  .catch((err) => {
    console.log(err);
  });

export { dataSource };
