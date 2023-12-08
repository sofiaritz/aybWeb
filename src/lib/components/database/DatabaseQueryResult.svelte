<script lang="ts">
	import type { DatabaseQuery } from "../../api/types";

	export let data: DatabaseQuery
</script>

<table class="border-gray-400 border p-3 w-full">
	<thead>
	<tr class="border-gray-400 border text-left">
		{#each data.fields as field}
			<th class="border-gray-400 border px-2">{field}</th>
		{/each}
	</tr>
	</thead>
	<tbody>
	{#each data.rows as row}
		<tr class="border-gray-400 border">
			{#each row as value}
				<td class="px-2 border-gray-400 border">{value}</td>
			{/each}
		</tr>
	{/each}
	</tbody>
</table>
