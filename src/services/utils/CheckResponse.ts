interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const checkResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    throw new Error("Ошибка получения данных");
  }

  const data: ApiResponse<T> = await response.json();

  if (!data.success) {
    throw new Error("Ошибка получения данных");
  }

  return data;
};

export default checkResponse;
