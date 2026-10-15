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

// export const searchProducts = async (query) => {
//   const res = await fetch(
//     `http://localhost:3000/products?q=${encodeURIComponent(query)}`,
//     { cache: "no-store" }
//   );
//   if (!res.ok) return [];
//   const data = await res.json();
//   return data;
// };

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