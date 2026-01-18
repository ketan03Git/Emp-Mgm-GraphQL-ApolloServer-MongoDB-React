// server/index.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolver.js';

dotenv.config();

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await mongoose.connect(process.env.MONGODB_URI ?? 'mongodb+srv://ketanmuttelwar62_db_user:root@123@empmgm.2mt3sqp.mongodb.net/?appName=EmpMgm');

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT ?? '4000', 10) },
    context: async ({ req }) => ({ req }),
  });

  console.log(`Server ready at ${url}`);
}

start().catch((err) => {
  console.error('Failed to start', err);
  process.exit(1);
});