---
title: Episode 1
layout: page
---

<script>
  import MermaidChart from "../../lib/components/MermaidChart.svelte";
  import { stately, options } from "./chart";
  import processStately from "$lib/processStately";
</script>

<MermaidChart>
{processStately(stately,options)}
</MermaidChart>