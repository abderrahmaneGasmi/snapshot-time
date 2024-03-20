import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="memory">
      das
      <div className="memory__board">{children}</div>
    </div>
  );
}
