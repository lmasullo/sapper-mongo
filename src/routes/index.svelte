<script>
  export let text;
  export let message;
  export let placeholder;

  function handleSubmit(params) {
    console.log("submit");
    messages = messages.concat(message);
    socket.emit("message", message);
  }

  socket.on("message", function(message) {
    messages = messages.concat(message);
  });
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<div id="heading">{text}</div>

<form action="">
  <input id="m" autocomplete="off" {placeholder} bind:value={message} />
  <button on:click|preventDefault={handleSubmit}>Send</button>
</form>

<div id="chatWindow">
  <ul id="messages">
    {#each messages as message}
      <li transition:fade>{message}</li>
    {/each}
  </ul>
</div>

<!-- <figure>
  <img alt="Borat" src="great-success.png" />
  <figcaption>HIGH FIVE!</figcaption>
</figure> -->

<!-- <p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
  </strong>
</p> -->
