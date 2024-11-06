// src/database/database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('app.db');

export const init = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL
    );
  `);
};

export const insertUser = async (username, password) => {
  const result = await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', username, password);
  return result;
};

export const getUser = async (username) => {
  const user = await db.getFirstAsync('SELECT * FROM users WHERE username = ?', username);
  return user || null;
};

export const insertCategory = async (name, icon, color) => {
  const result = await db.runAsync('INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)', name, icon, color);
  return result;
};

export const getCategories = async () => {
  const allRows = await db.getAllAsync('SELECT * FROM categories');
  return allRows;
};

export const deleteCategory = async (name) => {
  const result = await db.runAsync('DELETE FROM categories WHERE name = ?', name);
  return result;
};
