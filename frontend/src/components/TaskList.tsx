import { useState, useEffect, useMemo } from "react";
import useTask from "../hooks/useTask";
import Task from "../components/Task";
import { Collapse } from "@mui/material";
import { Task as TaskType } from "../types/tasks";

type TaskListProps = {
  collapsable?: boolean;
  initCollapse?: boolean;
  done?: boolean;
  undone?: boolean;
  focusNewTaskInList?: boolean;
};

const TaskList = ({ collapsable, initCollapse, done, undone, focusNewTaskInList = false }: TaskListProps) => {
  const { tasks, sort, isTaskInitCompleted } = useTask();

  const processedTasks = useMemo(() => {
    // Step 1: Sort the tasks based on the sort order
    const sorted = [...tasks].sort((a, b) => {
      if (sort === "asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sort === "desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0; // Return unsorted if sort is ""
    });
  
    // Step 2: Filter the sorted tasks based on the done/undone flags
    return sorted.filter(task => 
      (done && task.isDone) ||
      (undone && !task.isDone) ||
      (!done && !undone)
    );
  }, [tasks, sort, done, undone]);
  
  const [isCollapsed, setisCollapsed] = useState(initCollapse);
  const [prevTasks, setPrevTasks] = useState<TaskType[] | null>(null);
  const [newItem, setNewItem] = useState<TaskType | null>(null);

  useEffect(() => {
    if(isTaskInitCompleted) {
      if (prevTasks !== null && prevTasks.length < processedTasks.length) {
        // Wrap JSON.stringify in an arrow function to conform to map's expected signature
        const oldSet = new Set(prevTasks.map(task => JSON.stringify(task)));
        
        const newObjects = processedTasks.filter(task => !oldSet.has(JSON.stringify(task)));
    
        // If there are new objects, set the first one as newItem
        setNewItem(newObjects.length > 0 ? newObjects[0] : null);
      }
      setPrevTasks(processedTasks);
    }
  }, [processedTasks]);

  return (
    <div>
      { (collapsable || initCollapse) && (
        <button onClick={() => setisCollapsed(!isCollapsed)} className="my-1.5 flex gap-1 cursor-pointer">
          <p className={`${isCollapsed ? "transform -rotate-90" : "rotate-0"} -mt-0.25 transition-transform duration-300 ease-in-out`}>
            ▼
          </p>
          <p>COMPLETED TASKS ({processedTasks.length})</p>
        </button>
      )}
      <Collapse in={!isCollapsed} timeout="auto">
        <div className="flex flex-col">
          {processedTasks.map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                focus={focusNewTaskInList && (newItem !== null) && (task.id === newItem.id)}
              />
            );              
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default TaskList;