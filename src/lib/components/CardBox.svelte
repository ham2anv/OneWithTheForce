<script>
  export let title="Cards";
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<details tabindex="0" class="collapse bg-base-200 p-2 space-y-4 my-4" data-theme="night">
  <summary class="font-oswald font-bold uppercase">{title}</summary>
  <div class="flex gap-2 mx-auto w-max max-w-full sm:flex-wrap overflow-auto snap-x snap-mandatory">
    <slot/>
  </div>
</details>
