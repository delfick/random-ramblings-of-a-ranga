<div
    class="shadow-lg border-sky-200 border-2 mb-6 full-width min-w-0 p-4 bg-white rounded-lg dark:bg-gray-800 dark:shadow-dark-front"
>
    <div class="px-4 py-2 mt-2 dark:text-white">
        <div
            class="bg-emerald-100 dark:bg-dark-green-tldr shadow-2xl rounded-lg px-3 py-1 inline"
        >
            tldr
        </div>
        <slot />
    </div>
</div>

<style lang="postcss" global>
    @tailwind base;

    @tailwind utilities;
</style>
