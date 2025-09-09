import { Example } from "src/core/domain/entity/Example";
import { Page, Pageable, PageImpl } from "src/core/type/Page";
import { IExampleRepository } from "./IExampleRepository";
import AbstractRepository from "./AbstractRepository";
import { ExampleModel } from "src/core/model/ExampleModel";
import { Order } from "sequelize/types/model";

export class ExampleRepository
  extends AbstractRepository
  implements IExampleRepository
{
  async findAll(pageable: Pageable): Promise<Page<Example>> {
    const { page = 0, size = 10, sort = "id", direction = "ASC" } = pageable;
    const offset = page * size;
    const limit = size;
    const order: Order = [[sort, direction]];

    const result = await ExampleModel.findAndCountAll({
      offset,
      limit,
      order,
    });
    return new PageImpl(
      result.rows.map((b) => this.toEntity(b, Example)),
      pageable.page || 0,
      pageable.size || 10,
      result.count
    );
  }
}
