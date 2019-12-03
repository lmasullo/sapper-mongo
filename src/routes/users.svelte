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
  export let txtName;
  // export let data = {
  //   name: { txtName }
  // };

  function fnUpdate() {
    console.log("Update");

    //Re-fetch the users after adding one
    fetch("getUsers")
      .then(resp => resp.json())
      .then(function(users2) {
        console.log("Users", users2);
        users = users2;
      })
      .catch(e => {
        console.log(e);
      });
  }

  function fnAddUser() {
    console.log("Click");
    fetch("addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: txtName
      })
    })
      //.then(resp => resp.json()) // Transform the data into json
      // .then(function(users) {
      //   return { users };
      // })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("Post Success", data);
        fnUpdate();
      })
      .catch(function(error) {
        console.log("Post failure: ", error);
      });
  }
</script>

<svelte:head>
  <title>Users</title>
</svelte:head>

<h1>Users</h1>
{#each users as user}
  {user.name}
  <br />
{/each}

<input bind:value={txtName} />
<h1>Hello {txtName}!</h1>

<button on:click={fnAddUser}>Add a User</button>
