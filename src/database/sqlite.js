import * as SQLite from 'expo-sqlite';

// Initialize database connection
const db = SQLite.openDatabaseAsync('beebudget.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // Set PRAGMA journal mode to WAL
        tx.executeSql("PRAGMA journal_mode = WAL");

        // Create 'users' table if it doesn't exist
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          );`
        );

        // Create 'categories' table if it doesn't exist
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            icon TEXT NOT NULL,
            color TEXT NOT NULL
          );`
        );
      },
      (error) => {
        console.error("Transaction error during database initialization:", error);
        reject(error);
      },
      () => {
        console.log("Database initialized successfully.");
        resolve();
      }
    );
  });
};

export default db;
