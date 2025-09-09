import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { BusinessError } from "src/core/error/BusinessError";

export function ErrorHandler(
  error: FastifyError | BusinessError,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof BusinessError) {
    return reply.status(400).send({
      message: error.message,
      error,
    });
  }

  return reply.status(500).send({
    message: error.message || "Internal Server Error",
    error,
  });
}
