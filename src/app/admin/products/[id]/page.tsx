"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminProduct } from "@/services/admin/products";
import ProductDetailInfo from "@/app/admin/products/_components/ProductDetailInfo";

export default function AdminProductDetailPage() {
	const params = useParams<{ id: string }>();
	const id = params?.id;
	const { data, isLoading } = useAdminProduct(id);
	const router = useRouter();

	if (isLoading) return <div className="p-4">加载中...</div>;
	if (!data) return <div className="p-4">未找到该产品</div>;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">产品详情</h1>
				<Link
					href={`/admin/products/${id}`}
					className="rounded border px-3 py-1 text-sm hover:bg-muted"
				>
					预览(Modal)
				</Link>
				<Link
					href={`/admin/products/${id}/edit`}
					className="rounded border px-3 py-1 text-sm hover:bg-muted"
				>
					编辑
				</Link>
			</div>

			<ProductDetailInfo product={data} />

			<button
				type="button"
				onClick={() => router.back()}
				className="rounded border px-3 py-1 text-sm hover:bg-muted"
			>
				返回
			</button>
		</div>
	);
}
