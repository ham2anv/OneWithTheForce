<script>
	import mermaid from 'mermaid';
	import Icons from "$lib/icons";

	export let chart = null;

	$: showCode = false;

	function render(node) {
		mermaid.run({ nodes: [node] });
	}
</script>

<div class="relative">
	{#if showCode}
		<pre>{#if chart}{chart.render()}{:else}<slot />{/if}</pre>
	{:else}
		<pre class="mermaid" use:render>{#if chart}{chart.render()}{:else}<slot />{/if}</pre>
	{/if}
	<div class="absolute top-2 right-2 flex">
		<button
			class="btn btn-xs btn-ghost px-0"
			on:click={() => (showCode = !showCode)}
			title={showCode ? 'Show Chart' : 'Show Code'}
		>
			<svelte:component this={showCode ? Icons.Code : Icons.Chart} />
		</button>
	</div>
</div>
