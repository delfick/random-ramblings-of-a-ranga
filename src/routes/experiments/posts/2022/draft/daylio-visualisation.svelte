<script lang="ts" context="module">
  import { loader } from "@blog/meta";
  import type { BlogMeta } from "@blog/meta";
  import Papa from "papaparse";

  export const { load, update } = loader((meta: BlogMeta): BlogMeta => {
    meta.title = "Better visualisation of Daylio data";
    meta.published = "TBD";
    meta.tags = ["mood"];
    meta.tldr =
      "Daylio graphs aren't optimised for showing mood instability, so I'm making my own from csv exports";
    return meta;
  });
</script>

<script lang="ts">
  import { db } from "@app/moods/db";
  import type { Mood } from "@app/moods/db";

  const convertTime12to24 = (time12h: String) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }

    if (hours.length == 1) {
      hours = `0${hours}`;
    }

    return `${hours}:${minutes}`;
  };

  let files: FileList;
  let invalid: String | null;
  let moods: Array<Mood> = [];
  let haveMoods = false;
  let loadingMoods = false;

  const replaceMoods = () => {
    loadingMoods = false;
    haveMoods = false;
  };

  (async () => {
    if ((await db.moods.count()) > 0) {
      loadingMoods = true;
      db.moods.toArray().then((results) => {
        moods = results;
        loadingMoods = false;
        haveMoods = true;
      });
    }
  })();

  $: if (files && !haveMoods) {
    let first = files.item(0);
    if (first) {
      Papa.parse(first, {
        complete: (results) => {
          if (results.data.length > 1) {
            let headers = results.data.shift();
            if (
              JSON.stringify(headers) !=
              JSON.stringify([
                "full_date",
                "date",
                "weekday",
                "time",
                "mood",
                "activities",
                "note_title",
                "note",
              ])
            ) {
              invalid = `Incorrect header row (${JSON.stringify(headers)})`;
              return;
            }

            moods = [];
            db.moods.clear();

            for (let row of results.data as Array<Array<string>>) {
              let date = new Date(`${row[0]}T${convertTime12to24(row[3])}`);
              let mood: Mood = { when: date, mood: row[4] };
              moods.push(mood);
            }
            db.moods.bulkAdd(moods);
            haveMoods = true;
            moods = moods;
          }
        },
      });
    }
  }
</script>

{#if loadingMoods && !haveMoods}
  <p>Loading moods</p>
{:else if !haveMoods}
  <label for="avatar"
    >Specify daylio csv file (remains local to your computer)</label
  >
  <input
    accept="application/csv"
    bind:files
    id="moods"
    name="moods"
    type="file"
  />
{/if}
{#if invalid}
  <p>{invalid}</p>{/if}

{#if haveMoods}
  Have loaded {moods.length} moods
  <button class="btn btn-blue" on:click={replaceMoods}> replace moods </button>
{/if}

<style lang="postcss">
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>
