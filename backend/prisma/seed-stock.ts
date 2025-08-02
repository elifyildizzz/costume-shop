import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Stok verileri ekleniyor...');

  // Kostüm stok verileri
  const costumeStocks = [
    // GÜNEŞ KOSTÜMÜ (ID: 1)
    { costumeId: 1, size: 'S', quantity: 2 },
    { costumeId: 1, size: 'M', quantity: 3 },
    { costumeId: 1, size: 'L', quantity: 0 }, // Stokta yok

    // MANTAR KOSTÜMÜ (ID: 2)
    { costumeId: 2, size: 'M', quantity: 1 },
    { costumeId: 2, size: 'L', quantity: 2 },
    { costumeId: 2, size: 'XL', quantity: 0 }, // Stokta yok

    // CADI KOSTÜMÜ (ID: 3)
    { costumeId: 3, size: 'S', quantity: 0 }, // Stokta yok
    { costumeId: 3, size: 'M', quantity: 1 },

    // UĞUR BÖCEĞİ KOSTÜMÜ (ID: 4)
    { costumeId: 4, size: 'M', quantity: 2 },
    { costumeId: 4, size: 'L', quantity: 1 },

    // PRENSES KOSTÜMÜ (ID: 5)
    { costumeId: 5, size: 'S', quantity: 3 },
    { costumeId: 5, size: 'M', quantity: 2 },

    // SALYANGOZ KOSTÜMÜ (ID: 6)
    { costumeId: 6, size: 'M', quantity: 1 },
    { costumeId: 6, size: 'L', quantity: 0 }, // Stokta yok
    { costumeId: 6, size: 'XL', quantity: 2 },

    // BÖCEK KOSTÜMÜ (ID: 7)
    { costumeId: 7, size: 'S', quantity: 2 },
    { costumeId: 7, size: 'M', quantity: 1 },
    { costumeId: 7, size: 'L', quantity: 0 }, // Stokta yok

    // KELEBEK KOSTÜMÜ (ID: 8)
    { costumeId: 8, size: 'M', quantity: 1 },
    { costumeId: 8, size: 'L', quantity: 2 },

    // UĞUR BÖCEĞİ KOSTÜMÜ (ID: 9)
    { costumeId: 9, size: 'M', quantity: 3 },
    { costumeId: 9, size: 'L', quantity: 1 },

    // DOĞUM GÜNÜ PASTASI KOSTÜMÜ (ID: 10)
    { costumeId: 10, size: 'M', quantity: 2 },
    { costumeId: 10, size: 'L', quantity: 1 },
  ];

  // Aksesuar stok verileri
  const accessoryStocks = [
    // AKSESUAR 1 (ID: 1)
    { accessoryId: 1, size: 'standart', quantity: 5 },

    // AKSESUAR 2 (ID: 2)
    { accessoryId: 2, size: 'standart', quantity: 0 }, // Stokta yok

    // AKSESUAR 3 (ID: 3)
    { accessoryId: 3, size: 'standart', quantity: 3 },

    // AKSESUAR 4 (ID: 4)
    { accessoryId: 4, size: 'standart', quantity: 2 },
  ];

  // Kostüm stoklarını ekle
  for (const stock of costumeStocks) {
    await prisma.costumeStock.upsert({
      where: {
        costumeId_size: {
          costumeId: stock.costumeId,
          size: stock.size
        }
      },
      update: {
        quantity: stock.quantity
      },
      create: {
        costumeId: stock.costumeId,
        size: stock.size,
        quantity: stock.quantity
      }
    });
  }

  // Aksesuar stoklarını ekle
  for (const stock of accessoryStocks) {
    await prisma.accessoryStock.upsert({
      where: {
        accessoryId_size: {
          accessoryId: stock.accessoryId,
          size: stock.size
        }
      },
      update: {
        quantity: stock.quantity
      },
      create: {
        accessoryId: stock.accessoryId,
        size: stock.size,
        quantity: stock.quantity
      }
    });
  }

  console.log('Stok verileri başarıyla eklendi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 