<script lang="ts">
	import { entityInfo, unwrapResponse } from "../lib/api"
	import { userInstanceData } from "../lib/auth/stores"
	import Avatar from "../lib/components/Avatar.svelte"
	import DatabaseCard from "../lib/components/database/DatabaseCard.svelte"

	export let entity: string

	const fetchEntity = async (entity: string) =>
		unwrapResponse(await entityInfo(entity, $userInstanceData))
	const isNotFound = (message: string) =>
		message.trim().toLowerCase().startsWith("entity not found")
</script>

{#await fetchEntity(entity)}
	<h1 class="text-2xl">Loading...</h1>
{:then entity}
	<div class="mb-6 flex w-full gap-9">
		<div class="flex w-2/12 flex-col gap-6">
			<Avatar
				className="w-full border-gray-300 dark:border-gray-700 dark:border-2 bg-white border rounded"
				slug={entity.slug}
			/>
			<h1 class="text-2xl">{entity.slug}</h1>
		</div>
		<div class="flex w-full flex-col gap-6">
			{#each entity.databases as database (database.slug)}
				<DatabaseCard
					entity={entity.slug}
					slug={database.slug}
					type={database.database_type}
				/>
			{/each}
		</div>
	</div>
{:catch error}
	{#if isNotFound(error.message)}
		<h1 class="mb-5 text-5xl">404</h1>
		<h1 class="text-sm">
			The entity you are trying to see either does not exist or you are not authorized to view
			it.
		</h1>
	{/if}
{/await}
