<slot />

<style lang="postcss" global>
  @tailwind base;

  @tailwind utilities;

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  a {
    @apply underline text-blue-600 hover:text-blue-800 visited:text-purple-600;
  }

  nav a {
    @apply text-gray-900 text-base no-underline hover:no-underline font-extrabold !important;
  }

  nav a.text {
    @apply ml-3 text-lg !important;
  }
</style>
