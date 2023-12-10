import type {
	DatabaseCreation,
	DatabaseQuery,
	EntityInfo,
	Response,
	UserInstanceData,
	UserToken,
} from "./types"
import { DBType } from "./types"

async function request<T>(
	endpoint: string,
	auth: UserInstanceData,
	{
		headers: desiredHeaders = undefined,
		text = undefined,
		json = undefined,
		method = undefined,
	}: {
		headers?: HeadersInit
		text?: string
		json?: any
		method?: string
	} = {},
): Promise<Response<T>> {
	let url = new URL(auth.endpoint)
	url.pathname = endpoint

	let headers: any = {
		...desiredHeaders,
	}
	if (auth.token != null && auth.token !== "undefined") {
		headers["Authorization"] = `Bearer ${auth.token}`
	}

	let body
	if (text != null && json != null) {
		console.error(
			`Both text and json are set in a request to ${auth.endpoint}. JSON will be used, this behaviour may change at any time!`,
		)
		body = JSON.stringify(json)
	} else if (text != null) {
		body = text
	} else if (json != null) {
		body = JSON.stringify(json)
	}

	let res = await fetch(url, {
		headers,
		body,
		method,
	})

	return res.json()
}

export function unwrapResponse<T>(response: Response<T>): T {
	if (isError(response)) {
		throw response
	} else {
		return response as T
	}
}

// @ts-ignore
export const isError = (response: Response<any>): boolean => response?.["message"] != null

export async function login(entity: string, auth: UserInstanceData) {
	await request("/v1/log_in", auth, {
		headers: {
			entity: entity,
		},
		method: "POST",
	})
}

export async function confirm(token: string, auth: UserInstanceData) {
	return request<UserToken>("/v1/confirm", auth, {
		headers: {
			"authentication-token": token,
		},
		method: "POST",
	})
}

// TODO(sofiaritz): Check method
export async function createDatabase(slug: string, databaseType: DBType, auth: UserInstanceData) {
	return request<DatabaseCreation>(`/v1/${slug}/create`, auth, {
		headers: {
			"db-type": databaseType,
		},
	})
}

export async function entityInfo(entity: string, auth: UserInstanceData) {
	return request<EntityInfo>(`/v1/entity/${entity}`, auth)
}

export async function queryDatabase(slug: string, query: string, auth: UserInstanceData) {
	return request<DatabaseQuery>(`/v1/${slug}/query`, auth, {
		text: query,
		method: "POST",
	})
}
