export type Todo = {
  id: string;
  title: string;
  status: "untouched" | "processing" | "completed";
  detail: string | null;
  deadline: string | null;
};

export type FilterStatus = {
  all: boolean;
  untouched: boolean;
  processing: boolean;
  completed: boolean;
}