export type Variant = { id: number; name: string; productId: number };
export type Product = {
    id: number;
    name: string;
    description?: string;
    priceCents: number;
    imageUrl: string;
    category: string;
    inStock: boolean;
    variants: Variant[];
};
