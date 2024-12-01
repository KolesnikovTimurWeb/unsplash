import axios from "axios";
import { instance } from "../api/instance";
import { useNavigate, useRoutes } from "react-router-dom";

export const useGetAllImages = async (page: number) => {
  const res = await instance
    .get(`photos?page=${page}&per_page=25`)
    .then((res) => {
      return res.data;
    });
  return res;
};
export const useGetAllImagesByTag = async (
  page: number,
  tag: string | undefined
) => {
  if (tag === undefined) return;
  const res = await instance
    .get(`/search/photos?query=${tag}&page=${page}&per_page=25`)
    .then((res) => res.data);
  return res;
};
export const useGetImageById = async (id: string | null) => {
  if (id === null) return;
  const res = await instance.get(`photos/${id}`).then((res) => {
    return res.data;
  });
  return res;
};

export const useSearchImages = async (query: string | null) => {
  const navigate = useNavigate();

  navigate(`/collection/${query}`);
};
