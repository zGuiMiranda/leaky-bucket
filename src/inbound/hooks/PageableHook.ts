import { FastifyReply, FastifyRequest } from "fastify";
import { Pageable } from "src/core/type/Page";

declare module "fastify" {
  interface FastifyRequest {
    pageable?: Pageable;
  }
}

export async function pageableHook(
  request: FastifyRequest,
  _reply: FastifyReply
) {
  const { page, size, sort, direction } = request.query as {
    page: string;
    size: string;
    sort: string;
    direction: string;
  };

  request.pageable = {
    page: page ? parseInt(page) : 0,
    size: size ? parseInt(size) : 10,
    sort: sort || "id",
    direction: direction === "DESC" ? "DESC" : "ASC",
  };
}
