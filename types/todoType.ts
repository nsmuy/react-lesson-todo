export type Todo = {
  id: string;
  title: string;
  status: "untouched" | "in progress" | "completed";
  detail: string | null;
  deadline: string | null;
};