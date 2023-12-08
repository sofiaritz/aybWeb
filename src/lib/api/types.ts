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

export type EntityInfo = {
	slug: string
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
