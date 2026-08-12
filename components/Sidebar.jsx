import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
     <>
     <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/workspaces">WorkSpaces</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </div>
     </>
  );
}