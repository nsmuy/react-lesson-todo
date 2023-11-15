export type Todo = {
  id: string;
  title: string;
  status: "untouched" | "processing" | "completed";
  detail: string | null;
  deadline: string | null;
};