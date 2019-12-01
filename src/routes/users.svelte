<script>
  function getUsers() {
    fetch("/api/getUsers");
  }
  // import axios from "axios";

  // // Check if production or local
  // let API_URL = "";
  // if (process.env.NODE_ENV === "production") {
  //   API_URL = "https://racquet-rally.herokuapp.com/api/users/";
  // } else {
  //   API_URL = "http://localhost:3000/api/users.route.js/";
  // }

  // axios
  //   .get(API_URL)
  //   .then(response => {
  //     // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
  //     if (response.data === "Not Logged In!") {
  //       console.log("no data");
  //     } else {
  //       // User Logged in

  //       console.log(response.data);
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
</script>

<svelte:head>
  <title>Users</title>
</svelte:head>

<h1>Users</h1>

<button on:click={getUsers}>Get Users</button>
