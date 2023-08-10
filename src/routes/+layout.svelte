<script>
	import '../app.postcss';
	import mermaid from 'mermaid';

	mermaid.initialize({ 
    startOnLoad: false, 
    fontFamily: 'Oswald', 
  });
</script>

<main
	class="max-w-body mx-auto my-8 prose prose-headings:font-oswald prose-headings:tracking-wide prose-headings:uppercase prose-headings:font-bold prose-headings:text-accent prose-h1:text-center prose-strong:text-accent prose-strong:font-oswald prose-a:text-secondary prose-li:marker:text-accent prose-li:marker:content-['◢'] prose-figcaption:italic prose-figcaption:text-center prose-figure:flex prose-figure:flex-col prose-figure:my-2
  prose-code:font-dice prose-code:p-0 prose-code:text-accent prose-code:before:content-none prose-code:font-normal
  prose-headings:first:mt-0
  prose-pre:bg-base-300"
>
	<slot />
</main>
