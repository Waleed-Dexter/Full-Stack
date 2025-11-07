import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.variant.deleteMany();
    await prisma.product.deleteMany();

    await prisma.product.create({
        data: {
            name: "Classic Tee",
            description: "Soft cotton tee",
            priceCents: 1999,
            imageUrl: "https://picsum.photos/seed/tee/600/400",
            category: "Apparel",
            inStock: true,
            variants: { create: [{ name: "S" }, { name: "M" }, { name: "L" }] }
        }
    });

    await prisma.product.create({
        data: {
            name: "Running Shoes",
            description: "Lightweight daily runners",
            priceCents: 7499,
            imageUrl: "https://picsum.photos/seed/shoes/600/400",
            category: "Footwear",
            inStock: false,
            variants: { create: [{ name: "US 8" }, { name: "US 9" }, { name: "US 10" }] }
        }
    });

    await prisma.product.create({
        data: {
            name: "Wireless Headphones",
            description: "ANC, 30h battery",
            priceCents: 12999,
            imageUrl: "https://picsum.photos/seed/headphones/600/400",
            category: "Electronics",
            inStock: true,
            variants: { create: [{ name: "Black" }, { name: "Silver" }] }
        }
    });
}

main().finally(() => prisma.$disconnect());
