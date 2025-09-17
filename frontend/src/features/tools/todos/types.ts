export type TodoType = {
  id: number;
  name: string;
  description: string;
  date_created: string;
  entries: TodoEntryType[];
};

export type TodoEntryType = {
  id: number;
  text: string;
  is_done: boolean;
};
