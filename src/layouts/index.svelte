<script>
  export let title="One With the Force";
  export let data;
  export let form;
  export let layout;

</script>

<svelte:head><title>{title}</title></svelte:head>

<h1>{title}</h1>
<slot />