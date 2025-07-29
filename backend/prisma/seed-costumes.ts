import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'Costumes.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const costumes = JSON.parse(raw).costumes;

  for (const costume of costumes) {
    await prisma.costume.create({
      data: {
        name: costume.name,
        price: costume.price,
        image: costume.image,
        colors: Array.isArray(costume.colors) ? costume.colors.join(',') : costume.colors,
        size: Array.isArray(costume.size) ? costume.size.join(',') : costume.size,
      }
    });
  }
}

main()
  .then(() => {
    console.log('Kostümler başarıyla eklendi!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
