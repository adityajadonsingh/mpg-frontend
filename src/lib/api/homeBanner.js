import api from "@/lib/axios";

export const getAllBanners = async () => {
  const response = await api.get("/banners/");
  return response.data;
};