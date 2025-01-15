/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, deleteTask, updateTask }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [taskData, setTaskData] = useState("");

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="task-card" />;
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task-card"
      >
        <textarea
          className="task-card__textarea"
          value={ taskData || task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={() =>
            toggleEditMode()
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleEditMode();
              updateTask(task._id, taskData);
            }
          }}
          onChange={(e) => setTaskData(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="task-card"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="task-card__content">{task.content}</p>

      {mouseIsOver && (
        <div className="taskcard-footer">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="taskcard-footer-btn"
          >
            <Icon
              icon="zondicons:trash"
            />
          </button>
        </div>
      )}

      {/* {mouseIsOver && (
                
            )} */}
    </div>
  );
};

export default TaskCard;
