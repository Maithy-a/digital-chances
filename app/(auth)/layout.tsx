import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-panel">
            <header className="border-b border-line">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src="/logoipsum.png"
                            alt="Digital Chances"
                            width={36}
                            height={36}
                        />

                        <div className="flex flex-col">
                            <p className="font-display font-semibold tracking-tight">
                                Digital Chances
                            </p>

                            <p className="text-xs text-slate-500 font-mono">
                                HR Ledger System
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/"
                        className="text-sm text-slate-500 hover:text-brand transition-colors"
                    >
                        Back to home
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-6 py-12">
                {children}
            </main>
        </div>
    );
}