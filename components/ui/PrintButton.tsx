"use client";

export default function PrintButton() {
  return (
    <button title="In bài" onClick={() => window.print()}>
      <svg width="14" height="14"><use href="#i-print" /></svg>
    </button>
  );
}
