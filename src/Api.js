export const apiURL = "http://localhost:3334"; // "http://ec2-54-198-54-106.compute-1.amazonaws.com";
export async function buscar(serial) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const result = await fetch(
    apiURL + "/api/packages?Serial=" + serial,
    requestOptions,
    {
      mode: "no-cors",
    }
  );
  return result.json();
}

export async function send(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  const result = await fetch(apiURL + "/api/packages", requestOptions);
  return result.json();
}

export async function read(id, camara) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dimensioner: "123456", Package: camara }),
  };
  const result = await fetch(apiURL + "/api/packages/" + id, requestOptions);
  return result.json();
}

export async function newPackage() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const result = await fetch(
    apiURL + "/api/packages/newPackage",
    requestOptions,
    {
      mode: "no-cors",
    }
  );
  return result.json();
}
