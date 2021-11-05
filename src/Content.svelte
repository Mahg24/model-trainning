<script>
  import { getContext } from "svelte";
  import Surprise from "./Message.svelte";
  const apiURL = "http://localhost:3334";
  const { open } = getContext("simple-modal");

  const showSurprise = () => {
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };
    let url = apiURL + "/api/packages/calibrate";
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => open(Surprise, { message: result }))
      .catch((error) => open(Surprise, { message: error }));
  };
</script>

<p><button on:click={showSurprise}>Calibrate</button></p>
