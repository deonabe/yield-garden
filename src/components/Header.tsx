import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b p-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-800">🌿 Yield Garden</h1>
        <Link
          href="/compare"
          className="text-emerald-600 hover:underline text-sm sm:text-base font-medium"
        >
          Compare Plans →
        </Link>
      </div>
    </header>
  );
}
