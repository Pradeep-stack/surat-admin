/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable"; // Import useSortable
import { Icon } from "@iconify/react";
// import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [columnTitle,setTitle] = useState(column.title);

  const { attributes, listeners } = useSortable({
    id: column._id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  return (
    <div className="column-container">
      {/* Column title */}
      <div
        className="column-title"
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
      >
        <div className="">
          {/* <div className="column-title count-badge" >
                        0
                    </div> */}
          {!editMode && column.title}
          {editMode && (
            <input
              className="input-style"
              value={columnTitle}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
                updateColumn(column._id,columnTitle)
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
                updateColumn(column._id,columnTitle)
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column._id);
          }}
          className="delete-button"
        >
          <Icon onClick={() => {
            deleteColumn(column._id);
          }} icon="zondicons:trash" />
        </button>
      </div>

      {/* Column task container */}
      <div className="column-tasks">
        <div>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
      {/* Column footer */}
      <button
        className="column-footer"
        onClick={() => {
          createTask(column._id);
        }}
      >
        <Icon icon="icons8:plus" />
        Add task
      </button>
    </div>
  );
};

export default ColumnContainer;
