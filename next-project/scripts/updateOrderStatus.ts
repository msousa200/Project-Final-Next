import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });
    
    console.log(`Pedido ${orderId} atualizado para: ${newStatus}`);
    console.log(order);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

const orderId = process.argv[2];
const newStatus = process.argv[3];

if (!orderId || !newStatus) {
  console.log('Uso: ts-node updateOrderStatus.ts <orderId> <newStatus>');
  process.exit(1);
}

updateOrderStatus(orderId, newStatus);