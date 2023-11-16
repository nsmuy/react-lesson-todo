import React from "react";

type SortControlsProps = {
  isSorted: boolean,
  handleTodoSortButtonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  isSorted,
  handleTodoSortButtonChange,
}) => {
  return (
    <div>
      {/* 締切の昇順で並べ替えるチェックボックス */}
      <label className="todoSort">
        <span>締切が近い順に並べ替える</span>
        <input
          type="checkbox"
          checked={isSorted}
          onChange={handleTodoSortButtonChange} />
      </label>
    </div>
  );
};

export default SortControls;
