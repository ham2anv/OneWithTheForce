<script>
	export let type;
	export let number;
	const colors = {
		problem: ['bg-neutral', '!text-neutral-content', 'border-neutral'],
		edge: ['bg-secondary', '!text-secondary-content', 'border-secondary'],
		technique: ['bg-primary', '!text-primary-content', 'border-primary']
	};
</script>

<div
	class="card card-compact bg-base-100 shadow-xl w-[2.5in] h-[3.5in] overflow-hidden shrink-0 snap-center"
>
	<h3 class="card-title {colors[type][0]} {colors[type][1]} justify-center mt-0">
		<slot name="title" />
	</h3>
	<div class="card-body overflow-auto flex flex-col space-y-2">
		{#if $$slots.quote}
			<div class="{colors[type][2]} border-b-2 pb-2 italic">
				<slot name="quote" />
			</div>
		{/if}
		<slot name="body" />
	</div>
	<h4 class="card-actions {colors[type][0]} {colors[type][1]} justify-center mb-0 uppercase">
		{type}
		{number ? '#' + number : ''}
	</h4>
</div>
