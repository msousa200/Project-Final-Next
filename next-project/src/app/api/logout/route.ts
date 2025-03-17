import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout bem-sucedido" });

    response.headers.set(
      "Set-Cookie",
      `f2token=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no logout" }, { status: 500 });
  }
}