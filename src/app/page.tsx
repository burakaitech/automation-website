import React from "react";
import { TriggerCard } from "@/components/TriggerCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl">
        <TriggerCard />

        <footer className="text-center mt-6 text-xs text-slate-500 space-y-1">
          <p>
            Next.js 14 • React 18 • Python FastAPI • Deployed on Railway
          </p>
        </footer>
      </div>
    </main>
  );
}
