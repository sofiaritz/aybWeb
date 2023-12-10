<script lang="ts">
	import type { DatabaseQuery } from "../../api/types"

	export let data: DatabaseQuery
</script>

<table class="w-full border border-gray-400 p-3">
	<thead>
		<tr class="border border-gray-400 text-left">
			{#each data.fields as field}
				<th class="border border-gray-400 px-2">{field}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data.rows as row}
			<tr class="border border-gray-400">
				{#each row as value}
					<td class="border border-gray-400 px-2">{value}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
