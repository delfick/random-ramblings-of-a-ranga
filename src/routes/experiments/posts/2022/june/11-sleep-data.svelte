<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "Visualization of pairs of bedtime/waketime";
    meta.published = "June 2022";
    meta.tags = ["sleep"];
    meta.tldr =
      "Healthmate can only show this data 7 days at a time and this annoys me";
    return meta;
  });
</script>

<script lang="ts">
  import { dedent } from "ts-dedent";

  export let gridWidth = 1;
  export let gridHeight = 1;

  interface Time {
    h: string;
    x: number;
    y: number;
  }

  interface Pair {
    s: number;
    e: number;
  }

  let times: Array<Time> = [];

  const split = (s: string): number => {
    let h: number;
    let m: number;
    if (/\d\d?:\d\d?/.test(s)) {
      let [hh, mm] = s.split(":");
      h = Number(hh);
      m = Number(mm);
    } else if (/\d\d?.\d\d?/.test(s)) {
      let [hh, mm] = s.split(".");
      h = Number(hh);
      m = Number(mm);
    } else {
      throw new Error(
        "The string needs to be of the form HH:MM or HH.MM, got " + s
      );
    }

    if (h < 0 || h > 23) {
      throw new Error(
        "Hour needs to be between 0 and 23 inclusively, got " +
          h +
          " in '" +
          s +
          "'"
      );
    }

    if (m < 0 || m > 59) {
      throw new Error(
        "Minute needs to be between 0 and 59 inclusively, got " +
          m +
          " in '" +
          s +
          "'"
      );
    }

    h -= 17;
    if (h < 0) {
      h += 24;
    }

    return h + m / 60;
  };

  const pair = (bedtime: string, waketime: string): Pair => {
    let s = split(bedtime);
    let e = split(waketime);
    return { s, e };
  };

  let pairs: Array<Pair>;

  let csv = dedent`
    01:52,11:38
    21:30,09:27
    01:29,08:44
    21:47,11:25
    20:35,09:16
    20:15,09:56
    21:35,09:56
    21:27,08:31
    21:54,08:06
  `;

  $: gap = gridWidth / 24;
  $: {
    times = [];
    for (let i = 0; i < 24; i++) {
      let h = i + 17;
      if (h > 24) {
        h -= 24;
      }
      times.push({ h: String(h).padStart(2, "0"), x: gap * i, y: 0 });
    }
  }
  $: {
    pairs = [];
    csv.split("\n").map((line) => {
      if (/\d\d?[:.]\d\d?[, ]\d\d?[:.]\d\d?/.test(line)) {
        try {
          let split: Array<string>;
          if (line.includes(",")) {
            split = line.split(",");
          } else {
            split = line.split(".");
          }

          let nxt = pair(split[0], split[1]);
          if (nxt.s < nxt.e && nxt.s < 9 && nxt.e - nxt.s > 4) {
            pairs.push(nxt);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
</script>

<textarea bind:value={csv} />

<div bind:clientWidth={gridWidth} bind:clientHeight={gridHeight}>
  <div id="content">
    <svg class="w-full" style="min-height: {100 + pairs.length * 5}px">
      {#if gridWidth > 1 && gridHeight > 1}
        {#each times as time, i}
          {#if i % 2 != 0}
            <text x={time.x - 10} y={20}>{time.h}</text>
          {/if}
        {/each}
        {#each pairs as pair, i}
          <rect
            y={40 + i * 5}
            x={pair.s * gap}
            width={(pair.e - pair.s) * gap}
            height={2}
            fill="red"
          />
        {/each}
        {#each times as time, i}
          {#if i % 2 != 0}
            <line
              x1={time.x}
              x2={time.x}
              y1={25}
              y2={gridHeight - 20}
              stroke="black"
            />
          {/if}
        {/each}
        {#each times as time, i}
          {#if i % 2 != 0}
            <text x={time.x - 10} y={100 + pairs.length * 5}>{time.h}</text>
          {/if}
        {/each}
      {/if}
    </svg>
  </div>
</div>
