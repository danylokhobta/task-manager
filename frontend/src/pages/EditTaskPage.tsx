import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTask from "../hooks/useTask";

const EditTaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, handleUpdateTask } = useTask();

  const task = tasks.find((t) => t.id === Number(taskId));

  // Handle if task is not found
  if (!task) {
    console.log(tasks)
    return (
      <div>
        <h1>Task not found</h1>
        <button onClick={() => navigate("/tasks")}>Go back to tasks</button>
      </div>
    );
  }
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [is_done, setDone] = useState(task.is_done);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    handleUpdateTask(task.id, { is_done });
  }, [is_done]);

  const handleSave = useCallback(() => {
    handleUpdateTask(task.id, { title, description });
    navigate("/tasks");
  }, [task.id, title, description, handleUpdateTask, navigate]);

  return (
    <div>
      <h1>Edit Task</h1>
      <label htmlFor="taskTitle">Title</label>
      <input
        id="taskTitle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task Title"
      />
      <label htmlFor="taskDescription">Description</label>
      <input
        id="taskDescription"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        aria-label="Task Description"
      />
      <label htmlFor="taskDone">
        <input
          id="taskDone"
          type="checkbox"
          checked={is_done}
          onChange={() => setDone(!is_done)}
        />
        Done
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/tasks")}>Back to Task List</button>
    </div>
  );
};

export default EditTaskPage;