<script lang="ts">
	import { login, queryDatabase, unwrapResponse } from "../lib/api"
	import { userInstanceData } from "../lib/auth/stores"
	import DatabaseResult from "../lib/components/database/DatabaseQueryResult.svelte"
	import DatabasePagesHeader from "../lib/components/database/DatabasePagesHeader.svelte"
	import { createForm } from "felte"
	import { Input } from "../lib/components/common"
	import Button from "../lib/components/common/Button.svelte"
	import Textarea from "../lib/components/common/Textarea.svelte"

	export let entity: string
	export let slug: string

	let result: any
	let bigMode = false

	const { form } = createForm({
		onSubmit: async (values) => {
			let lowercaseQuery = values["query"].toLowerCase()
			if (
				lowercaseQuery.includes("delete") ||
				lowercaseQuery.includes("drop") ||
				lowercaseQuery.includes("truncate")
			) {
				let confirmed = confirm(
					"Your query can potentially perform destructive actions. Do you want to continue?",
				)
				if (!confirmed) return
			}

			result = { status: "loading" }
			let query = values["query"].trim()
			if (!query.endsWith(";")) query += ";"

			return await queryDatabase(`${entity}/${slug}`, query, $userInstanceData)
		},
		onSuccess: (data) => {
			result = data
		},
	})
</script>

<div class="flex gap-6 md:w-8/12">
	<DatabasePagesHeader selected="query" {slug} {entity} />
	<div class="flex w-full flex-col">
		<h1 class="text-2xl">Start querying your database</h1>
		<div class="flex gap-2 pt-4">
			<label for="big-mode mb-0">Big mode enabled</label>
			<input id="big-mode" type="checkbox" bind:checked={bigMode} />
		</div>
		<form class="mt-2 gap-6" use:form>
			{#if bigMode === true}
				<div class="flex flex-col gap-6">
					<Textarea
						name="query"
						rows="5"
						placeholder="SELECT
    id,
    name,
    score
FROM favorite_databases"
					/>
					<Button type="submit">Query</Button>
				</div>
			{:else}
				<div class="flex gap-6">
					<Input
						name="query"
						type="text"
						placeholder="SELECT * FROM favorite_databases"
					/>
					<Button type="submit">Query</Button>
				</div>
			{/if}
		</form>
		<div class="mt-3">
			{#if result != null}
				{#if result.message != null}
					<span><span class="pr-2 text-red-600">Error</span>{result.message}</span>
				{:else if result.fields != null && result.rows != null && result.rows.length > 0}
					<DatabaseResult data={result} />
				{:else if result.fields != null && result.rows != null}
					<span class="block text-gray-500">No rows returned</span>
				{:else if result.status === "loading"}
					<span class="block text-gray-500">Loading...</span>
				{:else}
					<span
						><span class="pr-2 text-red-600">Error</span>Unknown response from the
						server</span
					>
				{/if}
			{:else}
				<span class="block text-gray-500">Waiting for your query...</span>
			{/if}
		</div>
	</div>
</div>
