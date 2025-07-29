import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'Accessories.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const accessories = JSON.parse(raw).aksesuarlar || JSON.parse(raw).accessories;

  for (const accessory of accessories) {
    await prisma.accessory.upsert({
      where: { id: Number(accessory.id) },
      update: {
        name: accessory.name,
        price: accessory.price,
        image: accessory.image,
        colors: Array.isArray(accessory.colors) ? accessory.colors.join(',') : accessory.colors,
      },
      create: {
        id: Number(accessory.id),
        name: accessory.name,
        price: accessory.price,
        image: accessory.image,
        colors: Array.isArray(accessory.colors) ? accessory.colors.join(',') : accessory.colors,
      }
    });
  }
  console.log('Aksesuarlar başarıyla eklendi!');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
