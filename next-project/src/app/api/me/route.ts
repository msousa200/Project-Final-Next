/* eslint-disable @typescript-eslint/no-unused-vars */
export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: { id: String(session.user.id) },
      select: {
        id: true,
        email: true,
        name: true,
        dateOfBirth: true
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      dateOfBirth: userData.dateOfBirth
    });
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { name, email, dateOfBirth } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id as string },
      data: {
        name,
        dateOfBirth,
      },
      select: {
        id: true,
        email: true,
        name: true,
        dateOfBirth: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}