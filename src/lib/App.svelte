<script lang="ts">
    import { Temporal } from "@js-temporal/polyfill";
    import Time from "./Time.svelte";

    let time = Temporal.Now.plainDateTimeISO();
    let outOfDate = false;

    setInterval(() => {
        time = Temporal.Now.plainDateTimeISO();
        console.log(time.millisecond);
    }, 100);
</script>

<main>
    <Time {time} />
    <h1 class={"text-yellow-500 font-bold text-2xl"}>
        Looks like your time is out of date!
    </h1>
</main>
