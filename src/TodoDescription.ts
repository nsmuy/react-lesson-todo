export type Todo = {
  id: string;
  name: string;
  status: "untouched" | "in progress" | "completed";
  detail: string | null;
};

