<script>
  import { getContext } from "svelte";
  import Surprise from "./Message.svelte";
  const apiURL = "http://ec2-54-198-54-106.compute-1.amazonaws.com";
  const { open } = getContext("simple-modal");
  export let dimensioner;
  const showSurprise = () => {
    const raw = JSON.stringify({
      dimensioner,
    });
    let requestOptions = {
      method: "POST",
      body: raw,
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };
    let url = apiURL + "/api/packages/calibrate";
    console.log(raw);
    // fetch(url, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => open(Surprise, { message: result }))
    //   .catch((error) => open(Surprise, { message: error }));
  };
</script>

<p><button on:click={showSurprise}>Calibrate</button></p>
