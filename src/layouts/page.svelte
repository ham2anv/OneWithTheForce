<script>
	export let title;
	export let path;

	import {onMount} from "svelte";
	import readTime from "$lib/readTime.js";
	$: target = null;
	onMount(()=>target=document.querySelector("main"));
</script>

<svelte:head><title>{title}</title></svelte:head>

<nav class="breadcrumbs text-sm print:hidden justify-between flex items-center">
	<ul class="pl-0 font-oswald uppercase">
		<li><a href="/">Home</a></li>
		{#if path}
			{#each path as page}
				<li><a href="/{page.toLowerCase()}">{page}</a></li>
			{/each}
		{/if}
		<li>{title}</li>
	</ul>
	{#if target}<div class="text-center my-4" title="Estimated reading time">📖 ~{readTime(target)} min.</div>{/if}

</nav>

<h1>{title}</h1>

<slot />
