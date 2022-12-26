<script lang="ts">
    import { Temporal } from "@js-temporal/polyfill";
    import Time from "./Time.svelte";

    let time = Temporal.Now.plainDateTimeISO();
    let outOfDate = false;

    setTimeout(
        () =>
            setInterval(() => {
                time = Temporal.Now.plainDateTimeISO();
            }, 1000),
        1000 - time.millisecond
    );
    let time2 = Temporal.Now.plainDateTimeISO();

    setInterval(() => {
        time2 = Temporal.Now.plainDateTimeISO();
    }, 1000);

    let time3 = Temporal.Now.plainDateTimeISO();

    setInterval(() => {
        time3 = Temporal.Now.plainDateTimeISO();
    }, 1);
</script>

<main>
    <Time {time} />
    <Time time={time2} />
    <Time time={time3} />
    <h1
        class={"text-yellow-500 font-bold text-2xl" +
            (outOfDate ? "" : " hidden")}
    >
        Looks like your time is out of date!
    </h1>
</main>
