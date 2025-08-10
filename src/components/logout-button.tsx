"use client";

import * as React from "react";
import { useLogout } from "@/services/auth";
import { ROUTE_LOGIN } from "@/services/urls";

export function LogoutButton() {
	const { trigger, isMutating } = useLogout();

	async function onClick() {
		try {
			await trigger();
			window.location.href = ROUTE_LOGIN;
		} catch (e) {
			// Silently ignore; optionally show a toast
			console.error(e);
		}
	}

	return (
		<button
			onClick={onClick}
			className="inline-flex items-center justify-center rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
			disabled={isMutating}
		>
			{isMutating ? "正在退出…" : "退出登录"}
		</button>
	);
}
