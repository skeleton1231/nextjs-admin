import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { API_ADMIN_ME, API_AUTH_LOGOUT } from "./urls";
import { jsonFetcher, postJson } from "./fetcher";

export type MeResponse = {
	user?: { email?: string | null } | null;
	error?: string;
};

export function useMe() {
	return useSWR<MeResponse>(API_ADMIN_ME, jsonFetcher, {
		revalidateOnFocus: false,
	});
}

export function useLogout() {
	return useSWRMutation<{ success: boolean }>(API_AUTH_LOGOUT, postJson);
}
