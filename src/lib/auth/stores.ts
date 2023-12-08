import { writable } from "svelte/store"
import type { EntityInfo, UserInstanceData } from "../api/types"
import { entityInfo, isError } from "../api"

const CREDENTIAL_STORAGE_KEY = "v1/auth.token"

export function parseCredentials(credentials: string): UserInstanceData {
	let url = new URL(credentials)
	return {
		endpoint: url.origin,
		entity: url.username && url.password ? url.username : undefined,
		token: url.username && url.password ? url.password : undefined,
	}
}

/// This store contains the _raw_ credentials. Use `userInstanceData` for usable data.
export const credentials = writable<string | null>(localStorage.getItem(CREDENTIAL_STORAGE_KEY))
/// This store is guaranteed to contain `entity` and `token`
export const userInstanceData = writable<UserInstanceData | undefined>()
export const userInfo = writable<EntityInfo | undefined>()
export const loggedIn = writable(false)

credentials.subscribe(async (v) => {
	const resetStores = () => {
		loggedIn.set(false)
		userInfo.set(undefined)
		userInstanceData.set(undefined)
		localStorage.removeItem(CREDENTIAL_STORAGE_KEY)
	}

	if (
		v == null ||
		v.length === 0 ||
		parseCredentials(v).entity == null ||
		parseCredentials(v).token == null
	) {
		resetStores()
		return
	}

	let instanceData = parseCredentials(v)

	let data = await entityInfo(instanceData.entity!, instanceData)
	if (isError(data)) {
		console.error("Failed to retrieve entity info")
		// TODO(sofiaritz): Improve error handling. Even though this case should *never* happen, we should be ready.
		alert("Failed to retrieve entity info. Try again later")
		resetStores()
		return
	}

	data = data as EntityInfo // We have verified that this is not an error above.
	userInstanceData.set(instanceData)
	userInfo.set(data)
	loggedIn.set(true)
	localStorage.setItem(CREDENTIAL_STORAGE_KEY, v)
})
