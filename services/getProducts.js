export const getProducts = async () => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return data;
};

export const getProductById = async (id) => {
  const res = await fetch(`http://localhost:3000/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data;
};

export const getCategoryProducts = async (category) => {
  const res = await fetch(
    `http://localhost:3000/products?category=${encodeURIComponent(category)}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
};

export const getCategories = async () => {
  const res = await fetch("http://localhost:3000/categories", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data;
};