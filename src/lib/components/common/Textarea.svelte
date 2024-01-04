<script lang="ts">
	export let name: string = ""
	export let id: string = ""
	export let rows: string = ""
	export let placeholder: string = ""
	export let value: string = ""
	export let disabled: boolean = false
</script>

<textarea
	class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:font-mono dark:border-gray-700 dark:bg-gray-900 dark:text-white"
	{name}
	{id}
	{placeholder}
	{value}
	{disabled}
	{rows}
/>
