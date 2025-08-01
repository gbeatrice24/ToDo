const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

async function httpGet(url: string) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("GET error:", error);
      return null;
    }

    return response.json();
  } catch (err) {
    console.error("GET error:", err);
    return null;
  }
}

async function httpPost(url: string, body: unknown) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("POST error:", error);
      return null;
    }

    return response.json();
  } catch (err) {
    console.error("POST error:", err);
    return null;
  }
}

async function httpPut(url: string, body: unknown) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("PUT error:", error);
      return null;
    }

    return response.json();
  } catch (err) {
    console.error("PUT error:", err);
    return null;
  }
}

async function httpDelete(url: string) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DELETE error:", error);
      return null;
    }

    return response.json();
  } catch (err) {
    console.error("DELETE error:", err);
    return null;
  }
}

export const client = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
};
