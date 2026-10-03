import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LandingHeader() {
  return (
    <header className="border-b border-line bg-panel">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center jusify-center gap-2">
          <Image src="/logoipsum.png" alt="logo" width="36" height="36" />

          <div className="flex flex-col">
            <p className="font-display font-semibold tracking-tight">
              Digital Chances
            </p>
            <p className="text-xs text-slate-500 font-mono">HR Ledger System</p>
          </div>
        </div>

        <Link href="/sign-in" className="text-sm font-medium text-brand">
        <Button size="lg" variant="outline" className="px-4 py-3 h-9.5 bg-brand text-white rounded font-medium text-sm hover:bg-brand-600 transition-colors">
          Staff sign in
        </Button>
        </Link>
      </div>
    </header>
  );
}
