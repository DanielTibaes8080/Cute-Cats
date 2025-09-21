export async function searchCatsRandom() {
  const url = "https://cataas.com/cat?type=medium&fit=cover&position=center";
  try {
    const response = await fetch(url, {
      headers: { Accept: "image/*" },
      mode: "cors"
    });

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("Erro searchCatsRandom:", err);
    throw err;
  }
}
