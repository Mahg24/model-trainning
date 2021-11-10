<script>
  import Content from "./Content.svelte";
  import Modal from "svelte-simple-modal";
  const apiURL = "http://ec2-54-198-54-106.compute-1.amazonaws.com";
  //const apiURL = "http://localhost:3334";
  let status = "Send";
  let idPackage = "";
  let dim = "123456";

  function changeDimensioner() {
    if (dim == "123456") {
      dim = "456789";
    } else {
      dim = "123456";
    }
  }
  async function buscar() {
    const serial = document.getElementById("serial").value;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(apiURL + "/api/packages?Serial=" + serial, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        document.getElementById("height").value = response.Data.height;
        document.getElementById("width").value = response.Data.width;
        document.getElementById("width").value = response.Data.width;
        document.getElementById("length").value = response.Data.length;
        document.getElementById("weight").value = response.Data.weight;
        idPackage = response._id;
        status = "Read";
      })
      .catch((error) => {
        console.log(error);
        document.getElementById("height").value = "";
        document.getElementById("width").value = "";
        document.getElementById("length").value = "";
        document.getElementById("weight").value = "";
        status = "Send";
        idPackage = "";
      });
  }
  async function sendRead() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
      Serial: document.getElementById("serial").value,
      dimensioner: document.querySelector('input[name="drone"]:checked').value,
      Data: {
        height: parseFloat(document.getElementById("height").value),
        width: parseFloat(document.getElementById("width").value),
        length: parseFloat(document.getElementById("length").value),
        weight: parseFloat(document.getElementById("weight").value),
      },
    });
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let url = apiURL + "/api/packages/" + idPackage;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
</script>

<main>
  <div>
    <h1>Model Training</h1>
    <div>
      <h2>Serial</h2>
      <input type="text" id="serial" name="serial" on:blur={buscar} />
      <div class="data">
        <div>
          <h2>Height</h2>
          <input type="number" id="height" name="height" />
          <h2>Width</h2>
          <input type="number" id="width" name="width" />
        </div>
        <div>
          <h2>Length</h2>
          <input type="number" id="length" name="length" />
          <h2>Weight...</h2>
          <input type="number" id="weight" name="weight" />
        </div>
      </div>
      <button on:click={sendRead}>{status}</button>
      <Modal>
        <Content dimensioner={dim} />
      </Modal>

      <div class="dim">
        <input
          type="radio"
          on:change={changeDimensioner}
          id="huey"
          name="drone"
          value="123456"
          checked
        />
        <label for="huey">123456</label>

        <input
          on:change={changeDimensioner}
          type="radio"
          id="dewey"
          name="drone"
          value="456789"
        />
        <label for="dewey">456789</label>
      </div>
    </div>
  </div>
</main>

<style>
  .dim {
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: 10px;
  }
  .dim > label {
    margin: 0 10px;
  }
  .data {
    display: flex;
    justify-content: space-evenly;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  input {
    margin-bottom: 10px;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
