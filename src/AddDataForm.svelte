<script>
  import Modal from "svelte-simple-modal";
  import Content from "./Content.svelte";
  import CalibrateButton from "./CalibrateButton.svelte";
  import { buscar, send, read, newPackage } from "./Api";
  let idPackage = "";
  let dim = "123456";
  let resultDataPackage = {};
  function assingData(data) {
    document.getElementById("height").value =
      parseFloat(data.height) / 0.0254 || "";
    document.getElementById("width").value =
      parseFloat(data.width) / 0.0254 || "";
    document.getElementById("length").value =
      parseFloat(data.length) / 0.0254 || "";
    document.getElementById("weight").value = parseFloat(data.weight);
  }

  async function getRealdata() {
    const result = await buscar(document.getElementById("serial").value);
    if (result.Data) {
      idPackage = result._id;

      assingData(result.Data);
    } else {
      assingData({});
      idPackage = "";
    }
  }

  async function saveButton() {
    let raw = JSON.stringify({
      Serial: document.getElementById("serial").value,
      dimensioner: "123456",
      Data: {
        height: parseFloat(document.getElementById("height").value) * 0.0254,
        width: parseFloat(document.getElementById("width").value) * 0.0254,
        length: parseFloat(document.getElementById("length").value) * 0.0254,
        weight: parseFloat(document.getElementById("weight").value),
      },
    });

    const result = await send(raw);
    console.log(result);
    if (result.statusCode == undefined) {
      idPackage = result._id;
      alert("Guardado");
    } else if (result.statusCode == 400) {
      alert("Error");
    }
  }
  async function readButton() {
    document.getElementById("btn").style.display = "none";
    const result = await read(idPackage);
    console.log(result);
    if (!result.error) {
      const ObjIR = {
        name: "IR",
        High: result.result.Info_IR.High,
        Weight: result.result.Info_IR.Weight,
        L1a: result.result.Info_IR.L1a.Length,
        L2a: result.result.Info_IR.L2a.Length,
        L1b: result.result.Info_IR.L1b.Length,
        L2b: result.result.Info_IR.L2b.Length,
      };

      const ObjRGB = {
        name: "RGB",
        High: result.result.Info_RGB.High,
        Weight: result.result.Info_RGB.Weight,
        L1a: result.result.Info_RGB.L1a.Length,
        L2a: result.result.Info_RGB.L2a.Length,
        L1b: result.result.Info_RGB.L1b.Length,
        L2b: result.result.Info_RGB.L2b.Length,
      };
      resultDataPackage = {
        IR: ObjIR,
        RGB: ObjRGB,
      };
    } else {
      resultDataPackage = {
        result,
      };
    }
    document.getElementById("btn").style.display = "inline";
  }

  async function getNew() {
    const newpackage = await newPackage();
    let num = parseInt(newpackage.Serial.split("-")[1]) + 1;
    document.getElementById("serial").value = "Box-" + pad(num, 4);
    assingData({});
  }
  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
</script>

<div>
  <h1>Model Training</h1>
  <div>
    <div class="flex-data">
      <h2>Serial</h2>
      <input type="text" id="serial" name="serial" on:blur={getRealdata} />
      <button on:click={getNew}>New..</button>
    </div>

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
    <div class="flex-data">
      <button on:click={saveButton}>Save</button>
      <button on:click={readButton}>Read</button>
    </div>

    <Modal>
      <CalibrateButton dimensioner={dim} />
    </Modal>
    <Modal>
      <Content data={resultDataPackage} />
    </Modal>
  </div>
</div>

<style>
  .data {
    display: flex;
    justify-content: space-evenly;
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
  button {
    margin-bottom: 10px;
    width: 60%;
    height: 50px;
  }

  .flex-data {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
