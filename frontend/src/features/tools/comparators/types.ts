export type ComparatorType = {
  id: number;
  name: string;
  description: string;
  date_created: string;
  entries: ComparatorEntryType[];
};

export type ComparatorEntryType = {
  id: number;
  name: string;
  pros_cons: ProConType[];
};

export type ProConType = {
  id: number;
  text: string;
  type: "pro" | "con";
};
