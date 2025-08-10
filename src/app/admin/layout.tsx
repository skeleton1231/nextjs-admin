import { LogoutButton } from "@/components/logout-button";
import { AdminNav } from "./_components/admin-nav";

export default function AdminLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="grid grid-rows-[auto,1fr]">
			<header className="sticky top-0 z-40 flex items-center justify-between px-6 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="flex items-center gap-4">
					<span className="font-semibold">Admin Dashboard</span>
					<AdminNav />
				</div>
				<LogoutButton />
			</header>
			<main className="px-6 overflow-y-auto">{children}</main>
		</div>
	);
}
