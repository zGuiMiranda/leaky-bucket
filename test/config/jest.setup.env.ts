import * as dotenv from "dotenv";
import { Registry } from "../../src/infra/di/DI";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// Registry.getInstance().provide(
//   "exampleRepository",
//   ExampleRepository.getInstance()
// );
