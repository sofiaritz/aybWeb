<script lang="ts">
	export let type: string = "text"
	export let name: string = ""
	export let id: string = ""
	export let placeholder: string = ""
	export let value: string = ""
	export let disabled: boolean = false
</script>

<input
	class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:font-mono"
	{type}
	{name}
	{id}
	{placeholder}
	{value}
	{disabled}
/>
