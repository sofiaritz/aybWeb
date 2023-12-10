<script lang="ts">
	import { userInfo } from "../lib/auth/stores"
	import DatabaseCard from "../lib/components/database/DatabaseCard.svelte"
	import { Link } from "svelte-routing"
	import Avatar from "../lib/components/Avatar.svelte"
	import Button from "../lib/components/common/Button.svelte"
</script>

<div class="flex flex-col gap-6 md:w-8/12">
	<div class="flex flex-col gap-3">
		<h1 class="text-2xl">Organizations</h1>
		<div class="flex gap-6">
			<a
				href={`/u/${$userInfo.slug}`}
				class="flex flex-col items-center gap-1 text-black no-underline hover:text-black dark:text-white dark:hover:text-white"
			>
				<Avatar
					className="w-12 rounded border-gray-300 dark:border-gray-700 dark:border-2 bg-white border"
					slug={$userInfo.slug}
				/>
				<span class="text-sm">{$userInfo.slug}</span>
			</a>
		</div>
	</div>

	<div class="flex flex-col gap-3">
		<div class="flex w-full justify-between">
			<h1 class="text-2xl">Databases</h1>
			{#if $userInfo.databases.length > 0}
				<Link
					to="/database/new"
					class="rounded-lg bg-blue-700 px-3 py-1 text-center font-medium text-white no-underline hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
				>
					+ Create database
				</Link>
			{/if}
		</div>
		{#if $userInfo.databases.length > 0}
			<div class="grid grid-cols-2 gap-6">
				{#each $userInfo.databases as database (database.slug)}
					<DatabaseCard
						entity={$userInfo.slug}
						slug={database.slug}
						type={database.database_type}
					/>
				{/each}
			</div>
		{:else}
			<div class="mt-5 flex">
				<Link
					to="/database/new"
					role="button"
					class="flex h-60 w-full flex-col items-center justify-center gap-3 rounded border border-gray-300 p-2 text-black no-underline hover:text-black"
				>
					<span class="text-4xl">+</span>
					<h2 class="text-xl font-bold">Create a new database</h2>
					<span class="block text-gray-500"
						>The instance owner hasn't set any limits for your account</span
					>
				</Link>
			</div>
		{/if}
	</div>
</div>
