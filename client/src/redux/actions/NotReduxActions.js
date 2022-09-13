//Las pongo aca asi los localhost que hay que cambiarlos para el deploy quedan en 1 solo archivo

export const sendContactEmail = (data) => {
  return fetch(`http://localhost:3001/email/sendContact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};
