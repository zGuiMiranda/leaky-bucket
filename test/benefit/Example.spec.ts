import { ExampleUseCase } from "src/core/usecase/Example";
import { sequelize } from "../../src/config/database";
import { Pageable } from "../../src/core/type/Page";

describe("Example describe", () => {
  let exampleUseCase: ExampleUseCase;


  beforeAll(async () => {
    await sequelize.sync();

    exampleUseCase = new ExampleUseCase();
   
  });

  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  it("example it", async () => {

     const pageable: Pageable = {
      page: 1,
      size: 5,
      sort: "id",
      direction: "ASC",
    };

    const result = await exampleUseCase.execute(pageable);
    expect(result.content.length).toBe(5);
    expect(result.pageNumber).toBe(1);
    expect(result.pageSize).toBe(5);
    expect(result.totalElements).toBe(12);
    expect(result.totalPages).toBe(3);
    expect(result.first).toBe(false);
    expect(result.last).toBe(false);
  });




});
