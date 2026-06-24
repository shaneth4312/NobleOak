import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/nobleoaks";

function getDatabaseName(connectionUri: string): string {
  const pathMatch = connectionUri.match(/\/([^/?]+)(?:\?|$)/);
  return pathMatch?.[1] ?? "nobleoaks";
}

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const dbName = process.env.MONGODB_DB ?? getDatabaseName(uri);
    const db = client.db(dbName);

    console.log(`Connected to ${uri}`);
    console.log(`Database: ${dbName}`);

    const leads = db.collection("leads");

    await leads.createIndex({ createdAt: -1 });
    await leads.createIndex({ email: 1 });
    await leads.createIndex({ id: 1 }, { unique: true });

    console.log("Collection: leads");
    console.log("  Indexes: createdAt (desc), email, id (unique)");
    console.log(
      "  Document shape: { id, name, email, businessName?, service?, message, pageSlug?, createdAt }",
    );

    const leadCount = await leads.countDocuments();
    console.log(`  Documents: ${leadCount}`);

    console.log("Database setup complete.");
  } finally {
    await client.close();
  }
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
