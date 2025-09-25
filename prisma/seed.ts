import { PrismaClient } from '../src/generated/prisma';
import products from './data/dummydata';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        // quantity: p.quantity,
        image: p.image,
      },
    });
  }

  console.log('✅ Seeding done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
