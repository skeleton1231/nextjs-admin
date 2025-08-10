import Image from "next/image";
import { type AdminProduct } from "@/services/admin/products/config";

export default function ProductDetailInfo({ product }: { product: AdminProduct }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} width={400} height={400} className="rounded object-cover" />
        ) : (
          <div className="aspect-square w-full rounded bg-muted" />
        )}
      </div>
      <div className="md:col-span-2 space-y-2">
        <div className="text-lg font-medium">{product.name}</div>
        <div className="text-sm text-muted-foreground">Slug: {product.slug}</div>
        <div>分类: {product.category}</div>
        <div>
          价格: {product.price ?? "-"} {product.currency ?? ""}
        </div>
        <div>
          评分: {product.rating ?? "-"}（{product.review_count ?? 0} 条评论）
        </div>
        <div>语言: {product.locale}</div>
        {product.affiliate_url && (
          <a className="underline" href={product.affiliate_url} target="_blank" rel="noreferrer">
            前往商品链接
          </a>
        )}
        <div className="text-sm text-muted-foreground">
          创建时间: {product.created_at?.slice(0, 19).replace("T", " ")}
        </div>
      </div>
    </div>
  );
}



