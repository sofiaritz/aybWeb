<script lang="ts">
	import { Link } from "svelte-routing"

	export let entity: string
	export let slug: string
	export let selected: "overview" | "query" | "settings" = "overview"
</script>

<div class="flex w-32 flex-col gap-2">
	{#if selected === "overview"}
		<span>Overview</span>
	{:else}
		<Link to={`/u/${entity}/${slug}/overview`}>Overview</Link>
	{/if}

	{#if selected === "query"}
		<span>Query</span>
	{:else}
		<Link to={`/u/${entity}/${slug}/query`}>Query</Link>
	{/if}

	{#if selected === "settings"}
		<span>Settings</span>
	{:else}
		<Link to={`/u/${entity}/${slug}/settings`}>Settings</Link>
	{/if}
</div>
