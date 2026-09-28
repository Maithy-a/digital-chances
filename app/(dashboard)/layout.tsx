import { requireAuth } from "@/lib/auth/requireAuth";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireAuth();

    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}