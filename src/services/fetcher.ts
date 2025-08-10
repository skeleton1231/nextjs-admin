export async function jsonFetcher<T>(url: string): Promise<T> {
	const res = await fetch(url, { credentials: "same-origin" });
	if (!res.ok) throw new Error((await res.text()) || "Request failed");
	return (await res.json()) as T;
}

export async function postJson<T>(
	url: string,
	{ arg }: { arg?: unknown } = {},
): Promise<T> {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: arg ? JSON.stringify(arg) : undefined,
		credentials: "same-origin",
	});
	if (!res.ok) throw new Error((await res.text()) || "Request failed");
	return (await res.json()) as T;
}

export async function deleteJson<T>(url: string): Promise<T> {
	const res = await fetch(url, {
		method: "DELETE",
		credentials: "same-origin",
	});
	if (!res.ok) throw new Error((await res.text()) || "Request failed");
	return (await res.json()) as T;
}

export async function putJson<T>(
	url: string,
	{ arg }: { arg?: unknown } = {},
): Promise<T> {
	const res = await fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: arg ? JSON.stringify(arg) : undefined,
		credentials: "same-origin",
	});
	if (!res.ok) throw new Error((await res.text()) || "Request failed");
	return (await res.json()) as T;
}
