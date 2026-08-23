// page.tsx
// Welcome to the Frontend! (The "Dining Room")

// We import React, which is the core library we use to build user interfaces.
import React from "react";
// We import our custom 'TriggerCard' component. 
// A 'component' is just a reusable piece of the website (like a Lego block).
import { TriggerCard } from "@/components/TriggerCard";

// =====================================================================
// THE MAIN PAGE FUNCTION
// =====================================================================
// In Next.js, whatever function you 'export default' inside page.tsx becomes the actual web page!
export default function Home() {
  
  // The 'return' statement below looks like HTML, but it is actually called JSX (or TSX).
  // It allows us to write HTML-like code directly inside JavaScript!
  // The 'className' stuff (like "min-h-screen", "flex") are Tailwind CSS classes used for styling and colors.
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* This invisible div controls how wide the content can be */}
      <div className="w-full max-w-xl">
        
        {/* Here we place our Lego block! This pulls in the entire TriggerCard file and displays it right here. */}
        <TriggerCard />

        {/* This is the small grey text at the very bottom of the page */}
        <footer className="text-center mt-6 text-xs text-slate-500 space-y-1">
          <p>
            Next.js 14 • React 18 • Python FastAPI • Deployed on Railway
          </p>
        </footer>

      </div>
    </main>
  );
}
