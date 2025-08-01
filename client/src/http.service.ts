const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export async function httpGet(url: string) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP GET error ${response.status}: ${error}`);
  }

  return response.json();
}

export async function httpPost(url: string, body: unknown) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP POST error ${response.status}: ${error}`);
  }

  return response.json();
}

export async function httpPut(url: string, body: unknown) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP PUT error ${response.status}: ${error}`);
  }

  return response.json();
}

export async function httpDelete(url: string) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP PUT error ${response.status}: ${error}`);
  }

  return response.json();
}
