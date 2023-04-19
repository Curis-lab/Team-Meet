import React from "react";

export function Layout({children}: {children: React.ReactNode}) {
    return <div className="
      bg-blue-600
      h-screen
      w-full
      font-mono">
        {children}
      </div>

  }
  