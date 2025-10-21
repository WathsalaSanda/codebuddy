// Ensure this route runs at runtime (not during build)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import getSequelize from '@/lib/db/sequelize';
import getCommand from '@/models/Command';

// helper for safe error messages
function errMsg(e: unknown) {
  if (e instanceof Error) return e.message;
  try { return JSON.stringify(e); } catch { return String(e); }
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = (await req.json()) as {
      username?: string;
      command?: string;
      output?: string;
    };

    const { username, command, output } = body || {};

    // Validate input
    if (!username || !command || !output) {
      return NextResponse.json(
        { ok: false, error: 'Missing fields: username, command, output are required' },
        { status: 400 }
      );
    }

    // Initialize Sequelize
    const sequelize = getSequelize();
    const Command = getCommand();

    // Ensure database connection is valid
    await sequelize.authenticate();

    // Sync model with DB (safe for demo — use migrations in prod)
    await sequelize.sync();

    // Insert record
    const entry = await Command.create({ username, command, output });

    // Return success
    return NextResponse.json(
      { ok: true, id: entry.get('id') },
      { status: 201 }
    );

  } catch (e) {
    // 👇 Log the full error to Docker console
    console.error("💥 Full save error:", e);

    // Send response to client
    return NextResponse.json(
      { ok: false, error: errMsg(e) },
      { status: 500 }
    );
  }
}
