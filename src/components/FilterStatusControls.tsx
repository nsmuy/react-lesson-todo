import React from 'react'
import { FilterStatus } from "../../types/todoType";

type FilterStatusControlsProps =  {
  filterStatus: FilterStatus;
  handleFilterStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterStatusControls: React.FC<FilterStatusControlsProps> = ({
  filterStatus,
  handleFilterStatusChange,
}) => {
  return (
    <div>
      {/* 進行状態による絞り込み */}
      <label className="filterStatus">
        <input 
          type="checkbox"
          name="all"
          checked={filterStatus.all}
          onChange={handleFilterStatusChange}
        />All
        <input 
          type="checkbox"
          name="untouched"
          checked={filterStatus.untouched}
          onChange={handleFilterStatusChange}
        />Untouched
        <input 
          type="checkbox"
          name="processing"
          checked={filterStatus.processing}
          onChange={handleFilterStatusChange}
        />Processing
        <input 
          type="checkbox"
          name="completed"
          checked={filterStatus.completed}
          onChange={handleFilterStatusChange}
        />Completed
      </label>
    </div>
  )
}

export default FilterStatusControls