import Image from "next/image";
import {
	type AdminProduct,
	PRODUCT_FIELD_LABELS,
} from "@/services/admin/products/config";
import { formatPrice } from "@/lib/price";

export default function ProductDetailInfo({
	product,
}: {
	product: AdminProduct;
}) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div className="md:col-span-1">
				{product.image_url ? (
					<Image
						src={product.image_url}
						alt={product.name}
						width={400}
						height={400}
						className="rounded object-cover"
					/>
				) : (
					<div className="aspect-square w-full rounded bg-muted" />
				)}
			</div>
			<div className="md:col-span-2 space-y-2">
				<div className="text-lg font-medium">{product.name}</div>
				<div className="text-sm text-muted-foreground">
					{PRODUCT_FIELD_LABELS.slug}: {product.slug}
				</div>
				<div>
					{PRODUCT_FIELD_LABELS.category}: {product.category}
				</div>
				<div>
					{PRODUCT_FIELD_LABELS.price}: {formatPrice(product.price, product.currency)}
				</div>
				<div>
					{PRODUCT_FIELD_LABELS.rating}: {product.rating ?? "-"}（{product.review_count ?? 0} 条评论）
				</div>
				<div>
					{PRODUCT_FIELD_LABELS.locale}: {product.locale}
				</div>
				{product.affiliate_url && (
					<a
						className="underline"
						href={product.affiliate_url}
						target="_blank"
						rel="noreferrer"
					>
						前往商品链接
					</a>
				)}
				<div className="text-sm text-muted-foreground">
					{PRODUCT_FIELD_LABELS.created_at}: {product.created_at?.slice(0, 19).replace("T", " ")}
				</div>
			</div>
		</div>
	);
}
