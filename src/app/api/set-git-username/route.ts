import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { ok: false, error: "Invalid username" },
        { status: 400 }
      );
    }

    // Escape double quotes to avoid shell issues
    const safe = username.replace(/"/g, '\\"');

    // Run the git command (local machine; requires git installed)
    execSync(`git config --global user.name "${safe}"`, { stdio: "ignore" });

    // Read back to verify
    const current = execSync(`git config --global user.name`, {
      encoding: "utf8",
    }).trim();

    return NextResponse.json({
      ok: true,
      message: `Git username set to: ${current}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
