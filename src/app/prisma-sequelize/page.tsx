'use client';

import { useState } from 'react';

export default function PrismaSequelizePage() {
  const [orm, setOrm] = useState<'sequelize' | 'prisma'>('sequelize');
  const [msg, setMsg] = useState<string | null>(null);

  const handleSimulate = () => {
    const text = `Simulated commit: "chore(db): switch ORM to ${orm} (no actual git writes)"`;
    setMsg(text);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Prisma / Sequelize</h1>

      <div className="space-y-3">
        <p className="text-sm text-neutral-600">
          Toggle between <strong>Sequelize</strong> and <strong>Prisma</strong>. This is a teaching
          simulation — it does <em>not</em> perform real commits.
        </p>

        <div className="flex items-center gap-4">
          <label className="font-medium">ORM:</label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="orm"
              value="sequelize"
              checked={orm === 'sequelize'}
              onChange={() => setOrm('sequelize')}
            />
            Sequelize
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="orm"
              value="prisma"
              checked={orm === 'prisma'}
              onChange={() => setOrm('prisma')}
            />
            Prisma
          </label>
        </div>

        <button
          onClick={handleSimulate}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Simulate Commit
        </button>

        {msg && (
          <pre className="bg-neutral-100 p-3 rounded text-sm whitespace-pre-wrap">{msg}</pre>
        )}
      </div>
    </main>
  );
}

