const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const signup = async (user) => {
  const url = `${baseUrl}/api/auth/signup`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const signin = async (user) => {
  const url = `${baseUrl}/api/auth/signin`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
