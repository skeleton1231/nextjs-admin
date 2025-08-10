// API endpoints
export const API_AUTH_LOGIN = "/api/auth/login" as const;
export const API_AUTH_LOGOUT = "/api/auth/logout" as const;
export const API_ADMIN_ME = "/api/admin/me" as const;
export const API_ADMIN_USERS = "/api/admin/users" as const;
export const API_ADMIN_PRODUCTS = "/api/admin/products" as const;
export const apiAdminProduct = (id: string) =>
	`${API_ADMIN_PRODUCTS}/${id}` as const;

// App routes
export const ROUTE_LOGIN = "/login" as const;
export const ROUTE_ADMIN = "/admin" as const;
export const ROUTE_ADMIN_USERS = "/admin/users" as const;
export const ROUTE_ADMIN_PRODUCTS = "/admin/products" as const;
export const routeAdminProduct = (id: string) =>
	`${ROUTE_ADMIN_PRODUCTS}/${id}` as const;
export const routeAdminProductEdit = (id: string) =>
	`${ROUTE_ADMIN_PRODUCTS}/${id}/edit` as const;
