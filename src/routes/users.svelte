<script context="module">
  export function preload({ params, query }) {
    return this.fetch("getUsers")
      .then(resp => resp.json()) // Transform the data into json
      .then(function(users) {
        return { users };
      })
      .catch(e => {
        console.log(e);
      });
  }
</script>

<script>
  export let users;
</script>

<svelte:head>
  <title>Users</title>
</svelte:head>

<h1>Users</h1>

{#each users as user}{user.name}{/each}
