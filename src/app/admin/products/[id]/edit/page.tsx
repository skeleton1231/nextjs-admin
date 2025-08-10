"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { routeAdminProduct } from "@/services/urls";
import ProductEditForm from "@/app/admin/products/_components/ProductEditForm";

export default function AdminProductEditPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const id = params?.id as string;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">编辑产品</h1>
				<Link
					href={routeAdminProduct(id)}
					className="rounded border px-3 py-1 text-sm hover:bg-muted"
				>
					返回详情
				</Link>
			</div>

			<ProductEditForm
				id={id}
				onSuccess={() => router.push(routeAdminProduct(id))}
				onCancel={() => router.push(routeAdminProduct(id))}
			/>
		</div>
	);
}
