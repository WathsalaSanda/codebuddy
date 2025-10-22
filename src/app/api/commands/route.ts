// Ensure this route runs at runtime (not during build/prerender)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import getSequelize from "@/lib/db/sequelize";
import getCommand from "@/models/Command";

function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  try { return JSON.stringify(e); } catch { return String(e); }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      username?: string;
      command?: string;
      output?: string;
    };

    const { username, command, output } = body;
    if (!username || !command || !output) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const sequelize = getSequelize();
    const Command = getCommand();
    await sequelize.sync();

    const entry = await Command.create({ username, command, output });
    return NextResponse.json({ ok: true, id: entry.get("id") });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: errorMessage(e) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sequelize = getSequelize();
    const Command = getCommand();
    await sequelize.sync();

    const data = await Command.findAll({ order: [["id", "DESC"]] });
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: errorMessage(e) }, { status: 500 });
  }
}
