import { Sequelize } from "sequelize-typescript";
import { ExampleModel } from "src/core/model/ExampleModel";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
  models: [ExampleModel],
});
