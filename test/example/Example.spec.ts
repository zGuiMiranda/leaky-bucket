import { ExampleController } from "src/core/controller/ExampleController";
import { Pageable } from "../../src/core/type/Page";

describe("Example describe", () => {
  let controller: ExampleController;

  it("example it", async () => {
    const pageable: Pageable = {
      page: 1,
      size: 5,
      sort: "id",
      direction: "ASC",
    };

    controller.testMethod();
  });
});
