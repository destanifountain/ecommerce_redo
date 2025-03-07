import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface Product {
  id?: number;
  name: string;
  price: string | Float;
  quantity: string | number;
  image: string;
  description: string;
  category: string;
}

export const useDB = () => {
  const db = SQLite.openDatabaseSync("shop.db");
  useEffect(() => {
    initDB();
  }, []);
  const initDB = () => {
    const sql = `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL
    )`;
    db.execAsync(sql).then(() => {
      console.log("Database initialized");
    });
  };

  const insertProduct = async (product: Product) => {
    const sql = `INSERT INTO products (name, price, quantity, image, description, category) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await db.runAsync(sql, [
      product.name,
      product.price,
      product.quantity,
      product.image,
      product.description,
      product.category,
    ]);
    return result;
  };

  const getProducts = async () => {
    const sql = `SELECT * FROM products`;
    const allRows = await db.getAllAsync(sql);
    return allRows;
  };

  const getAllCategories = async () => {
    const sql = `SELECT DISTINCT category FROM products`;
    const allRows = await db.getAllAsync(sql);
    return allRows;
  };

  const getProductsByCategory = async (category: string) => {
    const sql = `SELECT * FROM products WHERE category = ?`;
    const allRows = await db.getAllAsync(sql, [category]);
    return allRows;
  };

  const getProduct = async (id: number) => {
    const sql = `SELECT * FROM products WHERE id = ?`;
    const allRows = await db.getAllAsync(sql, [id]);
    return allRows[0];
  };

  const deleteProduct = async (id: number) => {
    const sql = `DELETE FROM products WHERE id = ?`;
    const result = await db.runAsync(sql, [id]);
    return result;
  };

  const updateProduct = async (product: Product) => {
    const sql = `UPDATE products SET name = ?, price = ?, quantity = ?, image = ?, description = ?, category = ? WHERE id = ?`;
    const { id, name, price, quantity, image, description, category } = product;
    const result = await db.runAsync(sql, [
      name,
      price,
      quantity,
      image,
      description,
      category,
      id!,
    ]);
    return result;
  };

  return {
    getProducts,
    insertProduct,
    getAllCategories,
    getProductsByCategory,
    getProduct,
    updateProduct,
    deleteProduct,
  };
};
