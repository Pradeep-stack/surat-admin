import { useState, useMemo, useEffect } from "react";
import "../../../assets/css/KanbanBoard.css";
import { Icon } from "@iconify/react";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import {
  getTask,
  getColumn,
  addColumn,
  deleteColumnData,
  updateColumnData,
  addTask,
  updateTaskData,
  deleteTaskData,
} from "../../../api/kanbun";
const defaultCols = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "todo",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "todo",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "doing",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "doing",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "done",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "done",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "done",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "todo",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "todo",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "todo",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "todo",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "doing",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "doing",
    content: "Design and implement responsive UI",
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns?.map((col) => col._id), [columns]);
  const [tasks, setTasks] = useState([]);

  console.log("columns", columns);
  const fetchTask = async () => {
    try {
      const response = await getTask();
      console.log("response", response);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchColumn = async () => {
    try {
      const response = await getColumn();
      console.log("response", response);
      setColumns(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchMultipleData() {
      await fetchColumn();
      await fetchTask();
    }
    fetchMultipleData();
  }, []);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="main-conent-box mb-5">
      <div className="kanban-main">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="d-flex">
            <div className="d-flex">
              <SortableContext items={columnsId}>
                {columns?.map((col) => (
                  <ColumnContainer
                    key={col._id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col._id)}
                  />
                ))}
              </SortableContext>
            </div>
            <button
              onClick={() => {
                createNewColumn();
              }}
              className="kanban-button"
            >
              <Icon icon="icons8:plus" />
              Add Column
            </button>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn._id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );

 async function createTask(columnId) {
 
    // const newTask = {
    //   id: generateId(),
    //   columnId,
    //   content: `Task ${tasks.length + 1}`,
    // };
    // setTasks([...tasks, newTask]);

    const newTask = {
      columnId,
      content: ``,
    };
    const response = await addTask(newTask)
    if(response){
      fetchTask()
    }else{
      console.log("somthing probleam")
    }
  }

  async function deleteTask(id) {
    const response = await deleteTaskData(id)
    if(response){
      fetchTask()
    }else{
      console.log("somthing probleam")
    }
    // const newTasks = tasks.filter((task) => task._id !== id);
    // setTasks(newTasks);
  }

 async function updateTask(id, item) {
  const data = {content:item}
    const response = await updateTaskData(id,data)
    if(response){
      fetchTask()
    }else{
      console.log("somthing probleam")
    }
    // const newTasks = tasks.map((task) => {
    //   if (task.id !== id) return task;
    //   return { ...task, content };
    // });

    // setTasks(newTasks);
  }

  async function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    const response = await addColumn({ title: `Column ${columns.length + 1}` });
    if (response) {
      fetchColumn();
    }

    // setColumns([...columns, columnToAdd]);
  }

  async function deleteColumn(id) {
    const response = await deleteColumnData(id);
    if (response) {
      fetchColumn();
    } else {
      const filteredColumns = columns.filter((col) => col._id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter((t) => t.columnId !== id);
      setTasks(newTasks);
    }
  }

  async function updateColumn(id, formData) {
    const data = { title: formData };
    const response = await updateColumnData(id, data);
    if (response) {
      fetchColumn();
    } else {
      console.log("any eeror found");
    }
    // const newColumns = columns.map((col) => {
    //   if (col.id !== id) return col;
    //   return { ...col, title };
    // });

    // setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    console.log("active, over end",active, over)
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col._id === activeId);

      const overColumnIndex = columns.findIndex((col) => col._id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
};

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
