const BASE = import.meta.env.VITE_API_URL as string;

export async function fetchProducts(category?: string) {
    const url = category ? `${BASE}/products?category=${encodeURIComponent(category)}` : `${BASE}/products`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}
