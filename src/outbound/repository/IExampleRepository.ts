import { Example } from "src/core/domain/entity/Example";
import { Pageable, Page } from "src/core/type/Page";

export interface IExampleRepository {
  findAll(page: Pageable): Promise<Page<Example>>;
}
