//Las pongo aca asi los localhost que hay que cambiarlos para el deploy quedan en 1 solo archivo

export const sendContactEmail = async (data) => {
  return fetch(`http://localhost:3001/email/sendContact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const changeImage = async (data, idUser) => {
  return fetch(`http://localhost:3001/users/putUser/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: data }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const changeImageBackground = async (data, idUser) => {
  return fetch(`http://localhost:3001/users/putUser/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ backgroundImage: data }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const saveProfileConfig = async (data, idUser) => {
  return fetch(`http://localhost:3001/users/putUser/${idUser}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => e);
};

export const handleImage = async (e, setImage) => {
  const formData = new FormData();

  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "gu6gzzkc");

  await fetch("https://api.cloudinary.com/v1_1/dhyz4afz7/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      setImage(data.secure_url);
    })

    .catch(() =>
      setImage(
        "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/"
      )
    );
};
