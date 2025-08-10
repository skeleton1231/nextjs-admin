import { AdminOverview } from "./_components/admin-overview";

export const dynamic = "force-dynamic";

export default function AdminPage() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-semibold">Admin</h1>
			<AdminOverview />
		</div>
	);
}
