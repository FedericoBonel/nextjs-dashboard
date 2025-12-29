import postgres from "postgres";

const db = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default db;