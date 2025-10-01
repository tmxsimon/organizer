import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../lib/api";
import { fetchComparator } from "../services";

const PATH = "/tools/comparators";

export function useComparator(comparatorId: number) {
  const queryClient = useQueryClient();

  const {
    data: comparator,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comparator", comparatorId],
    queryFn: () => fetchComparator(comparatorId),
  });

  const addEntry = useMutation({
    mutationFn: () =>
      api.post(`${PATH}/${comparatorId}/entries`, null, {
        params: { name: "new comparator" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparator", comparatorId] });
    },
  });

  const editEntry = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      api.put(`${PATH}/entries/${id}`, null, {
        params: { name: name },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparator", comparatorId] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparator", comparatorId] });
    },
  });

  const addProCon = useMutation({
    mutationFn: ({ entryId, type }: { entryId: number; type: "pro" | "con" }) =>
      api.post(`${PATH}/entries/${entryId}/pros-cons`, null, {
        params: {
          text: `new ${type}`,
          type: type,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparator", comparatorId] });
    },
  });

  const editProCon = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      api.put(`${PATH}/pros-cons/${id}`, null, {
        params: { text: text },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparator", comparatorId] });
    },
  });

  const deleteProCon = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/pros-cons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comparator", comparatorId] });
    },
  });

  return {
    comparator,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
    addProCon,
    editProCon,
    deleteProCon,
  };
}
