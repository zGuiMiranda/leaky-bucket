import {
  FastifyReply,
  RouteGenericInterface,
  RawServerDefault,
  FastifySchema,
  FastifyTypeProviderDefault,
} from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import { Example } from "../domain/entity/Example";
import { Page } from "../type/Page";

type HTTPSTATUSES = 200 | 201 | 400 | 500 | 204;

export default abstract class AbstractController {
  protected STATUSES: { [key: string]: HTTPSTATUSES } = {
    INTERNAL_ERROR: 500,
    BUSINESS_ERROR: 400,
    SUCCESS_GET: 200,
    SUCCESS_POST: 201,
    CREATED: 201,
    NO_CONTENT: 204,
  };

  sendResponse(
    response: Page<Example>,
    reply: FastifyReply<
      RouteGenericInterface,
      RawServerDefault,
      IncomingMessage,
      ServerResponse<IncomingMessage>,
      unknown,
      FastifySchema,
      FastifyTypeProviderDefault,
      unknown
    >,
    status: HTTPSTATUSES = this.STATUSES.SUCCESS_GET
  ) {
    reply.status(status).send(response);
  }
}
