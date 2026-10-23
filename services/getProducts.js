import db from "@/data/db.json";

export const getProducts = async () => {
  return db.products;
};

export const getProductById = async (id) => {
  const product = db.products.find((p) => p.id === Number(id));
  return product || null;
};

export const getCategoryProducts = async (category) => {
  return db.products.filter((p) => p.category === category);
};

export const getCategories = async () => {
  return db.categories;
};

export const searchProducts = async (query) => {
  const all = await getProducts();
  const q = query.trim().toLowerCase();

  if (!q) return [];

  return all.filter(
    (p) =>
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    // p.description?.toLowerCase().includes(q)
  );
};