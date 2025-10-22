// Ensure this route runs at runtime (not during build)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import getSequelize from "@/lib/db/sequelize";
import getCommand from "@/models/Command";

function errMsg(e: unknown) {
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

    const { username, command, output } = body || {};
    if (!username || !command || !output) {
      return NextResponse.json(
        { ok: false, error: "Missing fields: username, command, output are required" },
        { status: 400 }
      );
    }

    const sequelize = getSequelize();
    const Command = getCommand();

    // only ensures connection; we don't auto-alter structure
    await sequelize.authenticate();

    const entry = await (Command as any).create({ username, command, output });
    return NextResponse.json({ ok: true, id: entry.get("id") }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: errMsg(e) }, { status: 500 });
  }
}
