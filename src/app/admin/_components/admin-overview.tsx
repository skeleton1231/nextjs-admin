"use client";

import Link from "next/link";
import { useMe } from "@/services/auth";
import { ROUTE_ADMIN_PRODUCTS, ROUTE_ADMIN_USERS } from "@/services/urls";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminOverview() {
  const { data, error, isLoading } = useMe();

  if (isLoading) return <p className="text-sm text-muted-foreground">加载中…</p>;
  if (error) return <p className="text-sm text-destructive">加载失败</p>;
  if (data?.error) return <p className="text-sm text-destructive">{data.error}</p>;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">欢迎回来</h2>
        <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <Link href={ROUTE_ADMIN_USERS} className="group">
          <Card className="transition hover:shadow-md group-hover:translate-y-[-2px]">
            <CardHeader>
              <CardTitle>用户</CardTitle>
              <CardDescription>管理用户、搜索、排序</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={ROUTE_ADMIN_PRODUCTS} className="group">
          <Card className="transition hover:shadow-md group-hover:translate-y-[-2px]">
            <CardHeader>
              <CardTitle>产品</CardTitle>
              <CardDescription>浏览和筛选产品列表</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}


