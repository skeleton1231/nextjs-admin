import Link from "next/link";
import { ROUTE_ADMIN, ROUTE_ADMIN_PRODUCTS, ROUTE_ADMIN_USERS } from "@/services/urls";

export function AdminNav() {
  const items = [
    { href: ROUTE_ADMIN, label: "概览" },
    { href: ROUTE_ADMIN_USERS, label: "用户" },
    { href: ROUTE_ADMIN_PRODUCTS, label: "产品" },
  ];
  return (
    <nav className="flex items-center gap-3 text-sm">
      {items.map((i) => (
        <Link key={i.href} href={i.href} className="hover:underline">
          {i.label}
        </Link>
      ))}
    </nav>
  );
}


