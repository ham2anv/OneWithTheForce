<script>
	export let title;
	export let path;
</script>

<svelte:head><title>{title}</title></svelte:head>

<nav class="breadcrumbs text-sm print:hidden">
	<ul class="pl-0">
		<li><a href="/">Home</a></li>
		{#if path}
			{#each path as page}
				<li><a href="/{page.toLowerCase()}">{page}</a></li>
			{/each}
		{/if}
		<li>{title}</li>
	</ul>
</nav>

<h1>{title}</h1>
<slot />
