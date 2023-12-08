<script lang="ts">
	import { userInfo } from "../lib/auth/stores";
	import DatabaseCard from "../lib/components/database/DatabaseCard.svelte";
	import { Link } from "svelte-routing";
</script>

<div class="md:w-8/12">
	<h1 class="text-2xl">Your databases</h1>

	{#if $userInfo.databases.length > 0}
		<div class="grid grid-cols-2 gap-6 mt-5">
			{#each $userInfo.databases as database (database.slug)}
				<DatabaseCard entity={$userInfo.slug} slug={database.slug} type={database.database_type}/>
			{/each}
		</div>
	{:else}
		<div class="flex mt-5">
			<Link to="/database/new" role="button" class="flex flex-col gap-3 justify-center items-center h-60 w-full border border-gray-300 rounded p-2 no-underline text-black hover:text-black">
				<span class="text-4xl">+</span>
				<h2 class="font-bold text-xl">Create a new database</h2>
				<span class="text-gray-500 block">The instance owner hasn't set any limits for your account</span>
			</Link>
		</div>
	{/if}
</div>
