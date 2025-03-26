/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    return NextResponse.redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent("/")}&error=UseNextAuthDirectly`
    );
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro no login" }, { status: 500 });
  }
}