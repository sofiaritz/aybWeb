<script lang="ts">
	import { Link } from "svelte-routing";

	export let entity: string
	export let slug: string
	export let selected: "overview" | "query" | "settings" = "overview"
</script>

<div class="flex flex-col w-32 gap-2">
	{#if selected === "overview"}
		<span>Overview</span>
	{:else}
		<Link to={`/database/${entity}/${slug}/overview`}>Overview</Link>
	{/if}

	{#if selected === "query"}
		<span>Query</span>
	{:else}
		<Link to={`/database/${entity}/${slug}/query`}>Query</Link>
	{/if}

	{#if selected === "settings"}
		<span>Settings</span>
	{:else}
		<Link to={`/database/${entity}/${slug}/settings`}>Settings</Link>
	{/if}
</div>
