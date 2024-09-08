import { createAsyncThunk } from "@reduxjs/toolkit";
import checkResponce from "../utils/CheckResponse";

// Определяем интерфейс для ответа
interface ResetPasswordResponse {
  data: any; // Замените any на конкретный тип, если возможно
}

// Создаём асинхронный запрос для сброса пароля
const resetPassword = createAsyncThunk<
  ResetPasswordResponse | undefined, // Тип возвращаемого значения
  string // Тип аргумента (email)
>("password/forgotPass", async (email: string, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://norma.nomoreparties.space/api/password-reset`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    // Проверяем ответ и возвращаем его данные
    const data = await checkResponce(response);

    // Если checkResponce возвращает данные, возвращаем их
    return data.data as ResetPasswordResponse; // Убедитесь, что это корректный тип
  } catch (error) {
    // В случае ошибки, используем rejectWithValue для передачи ошибки
    return rejectWithValue(error);
  }
});

export { resetPassword };
