import { useState } from "react";
import type {Product} from "../types";

function formatPrice(cents: number) {
    return (cents / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product, variant?: string) => void }) {
    const [variant, setVariant] = useState<string | undefined>(product.variants[0]?.name);
    const disabled = !product.inStock;

    return (
        <div className="rounded-2xl overflow-hidden shadow-sm border bg-white flex flex-col">
            <img src={product.imageUrl} alt={product.name} className="aspect-[4/3] object-cover" />
            <div className="p-4 flex-1 flex flex-col gap-3">
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                </div>

                <div className="text-xl font-bold">{formatPrice(product.priceCents)}</div>

                {product.variants.length > 0 && (
                    <select
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                        aria-label="Variant"
                    >
                        {product.variants.map(v => (
                            <option key={v.id} value={v.name}>{v.name}</option>
                        ))}
                    </select>
                )}

                <button
                    disabled={disabled}
                    onClick={() => onAdd(product, variant)}
                    className={`mt-auto w-full rounded-xl px-4 py-2 font-medium ${disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:opacity-90"}`}
                >
                    {disabled ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
