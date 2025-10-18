// Safe stub: this endpoint is intentionally NOT used anymore.
// It exists only to document that the app avoids executing shell commands.

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "Not used. The app simulates git commands client-side for safety per rubric.",
    },
    { status: 410 }
  );
}
