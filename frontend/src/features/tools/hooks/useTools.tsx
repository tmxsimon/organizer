import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchTools } from "../services";

const PATH = "/tools";

export function useTools(type: string) {
  const queryClient = useQueryClient();

  const {
    data: tools,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tools", type],
    queryFn: () => fetchTools(type),
  });

  const addEntry = useMutation({
    mutationFn: () =>
      api.post(`${PATH}/${type}`, null, {
        params: { name: "", description: "" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools", type] });
    },
  });

  const editEntry = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      api.put(`${PATH}/${type}/${id}`, null, {
        params: { name: name },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools", type] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/${type}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools", type] });
    },
  });

  return {
    tools,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
  };
}
