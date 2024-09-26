export const postData = async (payload: Object, apiEndpint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
  try {
    const response = await fetch(`${baseUrl}/${apiEndpint}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response");
    const jsonRes = await response.json();
    return jsonRes;
  } catch (error) {
    console.log("at error");
    console.log(error);
  }
};

export const getData = async (payload: Object, apiEndpint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;
  const response = await fetch(`${baseUrl}/${apiEndpint}`, {
    method: "GET",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
