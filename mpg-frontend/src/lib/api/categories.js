import api from "@/lib/axios";

export const getAllCategories = async () => {
  const response = await api.get("/categories/");
  return response.data;
};