<script lang="ts">
    import type { Temporal } from "@js-temporal/polyfill";
    import type PlainDateTime = Temporal.PlainDateTime;
    import { fly } from "svelte/transition";
    import Number from "./Number.svelte";
    import Colon from "./Colon.svelte";

    export let time: PlainDateTime;
    $: hour1 = String(time.hour).padStart(2, "0")[0];
    $: hour2 = String(time.hour).padStart(2, "0")[1];

    $: minute1 = String(time.minute).padStart(2, "0")[0];
    $: minute2 = String(time.minute).padStart(2, "0")[1];

    $: second1 = String(time.second).padStart(2, "0")[0];
    $: second2 = String(time.second).padStart(2, "0")[1];
</script>

<div class="flex font-bold text-9xl">
    {#key hour1}
        <Number value={hour1} />
    {/key}

    {#key hour2}
        <Number value={hour2} />
    {/key}
    <Colon />
    {#key minute1}
        <Number value={minute1} />
    {/key}
    {#key minute2}
        <Number value={minute2} />
    {/key}
    <Colon />
    {#key second1}
        <Number value={second1} />
    {/key}
    {#key second2}
        <Number value={second2} />
    {/key}
</div>
