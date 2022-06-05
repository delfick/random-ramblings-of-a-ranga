<script>
  import Icon from "@assets/favicon.ico";
  import Icon32 from "@assets/favicon-32x32.png";
  import Icon16 from "@assets/favicon-16x16.png";
  import Icon192 from "@assets/android-chrome-192x192.png";
  import Icon512 from "@assets/android-chrome-512x512.png";
  import AppleTouchIcon from "@assets/apple-touch-icon.png";
</script>

<svelte:head>
  <link rel="icon" href={Icon} />
  <link rel="icon" type="image/png" sizes="32x32" href={Icon32} />
  <link rel="icon" type="image/png" sizes="16x16" href={Icon16} />
  <link rel="icon" type="image/png" sizes="192x192" href={Icon192} />
  <link rel="icon" type="image/png" sizes="512x512" href={Icon512} />
  <link rel="apple-touch-icon" sizes="180x180" href={AppleTouchIcon} />

  <link rel="manifest" href="/site.webmanifest" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#ffffff" />
</svelte:head>

<slot />
