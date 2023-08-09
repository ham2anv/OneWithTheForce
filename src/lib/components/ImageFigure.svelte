<script>
	export let caption = false;
	export let alt = '';
	export let src;
	export let href = false;
  export let title = "";
  export let width = "max-w-full";
</script>

<figure class="{width}">
	{#if href}
		<a {href} {title}>
			<img {src} {alt} class="{width}" />
		</a>
	{:else}
		<img {src} {alt} class="{width}" />
	{/if}
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>
