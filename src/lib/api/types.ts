export type Response<T> = Error | T

export type UserInstanceData = {
	endpoint: string
	entity?: string
	token?: string
}

export enum DBType {
	SQLite = "sqlite",
	DuckDB = "duckdb",
}

export type Error = {
	message: string
}

export type DatabaseInfo = {
	slug: string
	database_type: string
}

export type EntityProfile = {
	display_name?: string
	description?: string
	organization?: string
	location?: string
	links: { url: string; verified: boolean }[]
}

export type EntityProfileUpdate = {
	display_name?: string
	description?: string
	organization?: string
	location?: string
	/// JSON.stringify { url: string }[]
	links?: string
}

export type EntityInfo = {
	slug: string
	profile?: EntityProfile
	databases: DatabaseInfo[]
}

export type UserToken = {
	token: string
}

export type DatabaseCreation = {
	entity: string
	database: string
	database_type: DBType
}

export type DatabaseQuery = {
	fields: string[]
	rows: string[][]
}

export type Notices = {
	content: string
}[]
