---
title: The Hunter
layout: page
---

<script>
  import CardBox from '$lib/components/CardBox.svelte';
  import Card from '$lib/components/Card.svelte';
</script>

## Investigative Abilities

- Bureaucracy
- Diplomacy
- Intimidation
- Search Your Feelings
- Surveillance
- Tracking

## General Abilities

- Athletics `d6_1d6_2`
- Fighting `d6_1`
- Mechanics `d6_1`
- Piloting `d6_1`
- Shadowing `d6_1d6_2`
- Shooting `d6_1d6_2`
- Survival `d6_1`

## Force Techniques

You start play with the following Force techniques.

<CardBox title="Force Techniques">
  <Card type="technique">
    <svelte:fragment slot="title">Mind Trick</svelte:fragment>
    <svelte:fragment slot="quote">The Force can have a strong influence on the weak-minded.</svelte:fragment>
    <svelte:fragment slot="body">
      <div>Expend for a free Interpersonal Push.</div>
      <div class="divider">OR</div>
      <div>Expend for +1 die on a Shadowing test.</div>
    </svelte:fragment>
  </Card>
  <Card type="technique">
    <svelte:fragment slot="title">Move Object</svelte:fragment>
    <svelte:fragment slot="quote">
      The Force is not a power you have. It’s not about lifting rocks. It’s the energy between all things, a tension, a balance, that binds the universe together.
    </svelte:fragment>
    <svelte:fragment slot="body">
      <div>Expend for a free Technical Push.</div>
      <div class="divider">OR</div>
      <div>Expend for +1 die on a Physical test.</div>
    </svelte:fragment>
  </Card>
</CardBox>

## Sources

You are accompanied much of the time by the following Sources. Extraordinary
circumstances may deprive you of their assistance.

### R5-B11, "Bill", Astromech Droid

Loyal, clever, and resourceful, if eager to please.

**Abilities**: Astrogation, Slicing, Technology

### Jeo-On Delani, Force Spirit

**Abilities**: Force Lore, History, Science
