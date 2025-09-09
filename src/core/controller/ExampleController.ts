import { FastifyReply } from "fastify/types/reply";
import { Pageable } from "../type/Page";
import { ExampleUseCase } from "../usecase/Example";
import AbstractController from "./AbstractController";
import { autoLogger } from "src/infra/logger/LoggerWrapper";

export class ExampleController extends AbstractController {
  private exampleUseCase: ExampleUseCase = new ExampleUseCase();

  async getPaginated(pageable: Pageable, res: FastifyReply) {
    autoLogger.info("Iniciando processo");
    const result = await this.exampleUseCase.execute(pageable);
    this.sendResponse(result, res);
  }
}
