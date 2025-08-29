import api from "../../lib/api";
import type { ToolType } from "./types";

const path = "/tools";

export const fetchTools = async (type: string) => {
  const result = await api.get<ToolType[]>(`${path}/${type}`);
  return result.data;
};
