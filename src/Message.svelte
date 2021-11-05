<script>
  export let message;
</script>

{#if !message.error}
  <p>
    🎉 {message} 🍾
  </p>
{:else}
  <p>
    ❌❌❌ {message.error} ❌❌❌
  </p>
{/if}
