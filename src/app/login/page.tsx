"use client";

import * as React from "react";
import { API_AUTH_LOGIN, ROUTE_ADMIN } from "@/services/urls";
// Removed unused import

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData();
    form.set("email", email);
    form.set("password", password);
    const res = await fetch(API_AUTH_LOGIN, { method: "POST", body: form });
    if (!res.ok) {
      const { error } = await res.json();
      setMessage(error ?? "登录失败");
      return;
    }
    window.location.href = ROUTE_ADMIN;
  }

  return (
    <div className="min-h-[80dvh] grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3">
        <h1 className="text-xl font-semibold">登录</h1>
        <input
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          登录
        </button>
        {message && <p className="text-destructive text-sm">{message}</p>}
      </form>
    </div>
  );
}


