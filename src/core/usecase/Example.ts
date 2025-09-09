import { IExampleRepository } from "../../../src/outbound/repository/IExampleRepository";
import { inject } from "../../infra/di/DI";
import { Example } from "../domain/entity/Example";
import { Page, Pageable } from "../type/Page";

export class ExampleUseCase {
  @inject("exampleRepository")
  private exampleRepository: IExampleRepository;

  async execute(page: Pageable): Promise<Page<Example>> {
    return this.exampleRepository.findAll(page);
  }
}
