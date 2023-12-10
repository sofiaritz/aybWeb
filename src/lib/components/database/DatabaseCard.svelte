<script lang="ts">
	import { DBType } from "../../api/types"
	import { Link } from "svelte-routing"

	export let entity: string
	export let slug: string
	export let type: DBType

	const displayType = (type: DBType) => {
		if (type === DBType.SQLite) {
			return "SQLite"
		} else if (type === DBType.DuckDB) {
			return "DuckDB"
		} else {
			return "Unknown database type"
		}
	}

	const background = async (slug: string) => {
		const utf8 = new TextEncoder().encode(slug)
		let hash = await crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
			const hashArray = Array.from(new Uint8Array(hashBuffer))
			return hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("")
		})

		let hashCode = [...hash].reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
		let primaryColor = (() => {
			let c = (hashCode & 0x00ffffff).toString(16).toUpperCase()

			return "00000".substring(0, 6 - c.length) + c
		})()

		let patternClass = (() => {
			let firstNum = parseInt(primaryColor[3], 16)
			return [
				"pattern-checks-md",
				"pattern-diagonal-stripes-md",
				"pattern-dots-xl",
				"pattern-dots-xl",
				"pattern-horizontal-stripes-sm",
				"pattern-vertical-stripes-md",
				"pattern-triangles-lg",
				"pattern-triangles-md",
				"pattern-diagonal-lines-sm",
				"pattern-cross-dots-xl",
				"pattern-cross-dots-lg",
				"pattern-grid-md",
				"pattern-checks-lg",
				"pattern-checks-sm",
				"pattern-grid-sm",
				"pattern-diagonal-stripes-md",
			][firstNum]
		})()

		return [patternClass, `background-color: #${primaryColor}; color: white;`]
	}
</script>

<Link
	to={`/u/${entity}/${slug}/overview`}
	role="button"
	class="rounded border border-gray-300 text-black no-underline hover:text-black dark:border-gray-800 dark:text-white dark:hover:text-white"
>
	{#await background(slug)}
		<div class="pattern-checks-sm h-24"></div>
	{:then result}
		<div class={`h-24 ${result[0]}`} style={result[1]}></div>
	{/await}

	<div class="p-2">
		<span>{slug.split(".")[0]}</span>
	</div>
	<span class="mb-2 block px-2 dark:text-gray-400">Database type: {displayType(type)}</span>
</Link>
