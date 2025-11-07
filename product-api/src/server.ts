import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

// GET /products?category=Apparel
app.get("/products", async (req: Request, res: Response) => {
    const { category } = req.query as { category?: string };
    const products = await prisma.product.findMany({
        where: category ? { category } : {},
        include: { variants: true },
        orderBy: { createdAt: "desc" }
    });
    res.json(products);
});

// GET /products/:id
app.get("/products/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const product = await prisma.product.findUnique({
        where: { id },
        include: { variants: true }
    });
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
});

// POST /products (bonus)
const ProductInput = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    priceCents: z.number().int().positive(),
    imageUrl: z.string().url(),
    category: z.string().min(1),
    inStock: z.boolean().default(true),
    variants: z.array(z.string()).default([])
});
app.post("/products", async (req: Request, res: Response) => {
    const parsed = ProductInput.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.format());
    const { variants, ...data } = parsed.data;

    const created = await prisma.product.create({
        data: {
            ...data,
            variants: { create: variants.map((name: string) => ({ name })) }
        },
        include: { variants: true }
    });
    res.status(201).json(created);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
