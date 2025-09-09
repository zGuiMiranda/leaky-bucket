import { FastifyInstance, FastifyRequest } from "fastify";
import { ExampleController } from "./core/controller/ExampleController";
import { pageableHook } from "./inbound/hooks/PageableHook";
import { Pageable } from "./core/type/Page";

const exampleController = new ExampleController();

export type PageParams = {
  page: string | number;
  size: string | number;
  sort: "id" | "name" | "description";
  direction: "asc" | "desc" | "ASC" | "DESC";
};

export async function ExampleRoutes(fastify: FastifyInstance) {
  fastify.get("", {
    preHandler: pageableHook,
    schema: {
      querystring: {
        type: "object",
        properties: {
          page: { type: "string" },
          direction: { type: "string", enum: ["asc", "desc", "ASC", "DESC"] },
          size: { type: "string" },
          sort: { type: "string", enum: ["id", "name", "description"] },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            content: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  description: { type: "string" },
                  isActive: { type: "boolean" },
                },
                required: ["id", "name", "description", "isActive"],
              },
            },
            pageNumber: { type: "integer" },
            pageSize: { type: "integer" },
            totalElements: { type: "integer" },
            totalPages: { type: "integer" },
            first: { type: "boolean" },
            last: { type: "boolean" },
            empty: { type: "boolean" },
          },
          required: [
            "content",
            "pageNumber",
            "pageSize",
            "totalElements",
            "totalPages",
            "first",
            "last",
            "empty",
          ],
        },
      },
    },
    handler: async (
      request: FastifyRequest<{
        Querystring: Pageable;
      }>,
      reply
    ) => {
      return exampleController.getPaginated(request.query, reply);
    },
  });
}
