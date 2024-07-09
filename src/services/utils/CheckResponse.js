const checkResponce = async (response) => {
  if (!response.ok) {
    throw new Error("Ошибка получения данных");
  }

  const data = await response.json();

  if (!data?.["success"]) {
    throw new Error("Ошибка получения данных");
  }
  return data;
};

export { checkResponce };
