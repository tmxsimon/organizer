import api from "../../../lib/api";
import type { ComparatorType, ProConType } from "./types";

const path = "/tools/comparators";

export const fetchComparators = async () => {
  const result = await api.get(path);
  return result;
};

export const fetchComparator = async (id: number) => {
  const result = await api.get<ComparatorType>(`${path}/${id}`);
  return result.data;
};

export const fetchProCon = async (id: number) => {
  const result = await api.get<ProConType>(`${path}/${id}`);
  return result.data;
};
