<script>
  import { onMount } from "svelte";
  import mermaid from "mermaid";
  
  onMount(() => {
    console.log("Graphing...");
    mermaid.run()
  });
  </script>
  
<pre class="mermaid">
<slot/>
</pre>