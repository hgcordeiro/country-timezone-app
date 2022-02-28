import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import AppError from "./errors/AppError";

import "dotenv/config";

import { schema } from "./schema";

async function main() {
  const port = process.env.APOLLO_PORT || 3000;

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server running on ${url}`);
  });
}

main().catch(error => {
  if (error instanceof AppError) {
    console.log("Uncaught Error:", error);
  }
});
