import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./api";
import type {Product} from "./types";
import ProductCard from "./components/ProductCard";

export default function App() {
    const [category, setCategory] = useState<string | "">("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<{ id: number; name: string; variant?: string; qty: number }[]>([]);

    useEffect(() => {
        setLoading(true);
        fetchProducts(category || undefined)
            .then(setProducts)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [category]);

    const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))).sort(), [products]);

    function handleAdd(p: Product, variant?: string) {
        setCart((prev) => {
            const key = `${p.id}:${variant || ""}`;
            const existing = prev.find(i => `${i.id}:${i.variant || ""}` === key);
            if (existing) return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { id: p.id, name: p.name, variant, qty: 1 }];
        });
    }

    return (
        <main className="max-w-6xl mx-auto p-4">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <div className="flex gap-3 items-center">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                        aria-label="Filter by category"
                    >
                        <option value="">All categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="text-sm text-gray-500">Cart: {cart.reduce((s, i) => s + i.qty, 0)}</div>
                </div>
            </header>

            {loading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />)}
            </div>}

            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => <ProductCard key={p.id} product={p} onAdd={handleAdd} />)}
                </div>
            )}
        </main>
    );
}
