import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/nobleoaks";

function getDatabaseName(connectionUri: string): string {
  const pathMatch = connectionUri.match(/\/([^/?]+)(?:\?|$)/);
  return pathMatch?.[1] ?? "nobleoaks";
}

const dbName = process.env.MONGODB_DB ?? getDatabaseName(uri);

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client;
}

export async function getDb() {
  const mongoClient = await getMongoClient();
  return mongoClient.db(dbName);
}

export function getMongoUri(): string {
  return uri;
}

export function getMongoDatabaseName(): string {
  return dbName;
}
