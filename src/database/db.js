import * as SQLite from 'expo-sqlite';

let db = SQLite.openDatabaseAsync('beebudget.db');

export const init = async () => {
  // Open the database asynchronously and assign it to `db`

  // console.log('Database initialized:', db);
  db = await SQLite.openDatabaseAsync('beebudget.db');
  // Execute the setup queries for creating tables
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

// Function to insert a user into the 'users' table
export const insertUser = async (username, password) => {

  console.log('InsertUser>>', username, password);
  
  db = await SQLite.openDatabaseAsync('beebudget.db');

  if (!username || !password) {
    console.error("Username or password cannot be empty.");
    throw new Error("Username or password cannot be empty.");
  }

  try {
    const result = await db.runAsync("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    console.log(result , result.lastInsertRowId, result.changes);
    return result;
  } catch (error) {
    console.error("Detailed error inserting user:", error);
    throw error;
  }
};



// Function to get a user by username from the 'users' table
export const getUser = async (username) => {
  try {
    const user = await db.getFirstAsync(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return user || null;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// Function to insert a category into the 'categories' table
export const insertCategory = async (name, icon, color) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)',
      [name, icon, color]
    );
    return result;
  } catch (error) {
    console.error('Error inserting category:', error);
  }
};

// Function to get all categories from the 'categories' table
export const getCategories = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM categories');
    return allRows;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Function to delete a category by name from the 'categories' table
export const deleteCategory = async (name) => {
  try {
    const result = await db.runAsync('DELETE FROM categories WHERE name = ?', [name]);
    return result;
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};
