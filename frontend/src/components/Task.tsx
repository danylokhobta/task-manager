import { useState, useRef, useEffect } from "react";
import useTask from "../hooks/useTask";
import { Task as TaskType } from "../types/tasks";
import TextareaAutosize from "react-textarea-autosize";

const Task = ({
  task,
  focus = false,
}: {
  task: TaskType;
  focus: boolean;
}) => {
  const { handleDeleteTask, deleteLocalTask, handleUpdateTask, uploadTask } = useTask();
  const titleArea = useRef<HTMLTextAreaElement>(null);
  const descArea = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Check if the blur event is caused by focusing on the other textarea
    if (e.relatedTarget === titleArea.current || e.relatedTarget === descArea.current) {
      return; // Don't trigger blur logic if switching between title and description
    }
  
    if (newTitle === "" && newDescription === "") {
      if (task.userId) {
        handleDeleteTask(task.id);
      } else {
        deleteLocalTask(task.id);
      }
    } else if (task.title !== newTitle || task.description !== newDescription) {
      if (task.userId) {
        handleUpdateTask(task.id!, { title: newTitle, description: newDescription });
      } else {
        uploadTask({ title: newTitle, description: newDescription, id: task.id });
      }
    }
  
    setIsFocused(false); // Set isFocused to false if the blur is leaving the task
  };
  
  const handleFocus = (focusOn: "title" | "desc") => {
    setIsFocused(true);
    if (focusOn === "title" && titleArea.current) {
      const titleLength = titleArea.current.value.length;
      setTimeout(() => {
        titleArea.current?.focus();
        titleArea.current?.setSelectionRange(0, titleLength); // Select the title
      }, 10);
    }
  
    if (focusOn === "desc" && descArea.current) {
      const descLength = descArea.current.value.length;
      setTimeout(() => {
        descArea.current?.focus();
        descArea.current?.setSelectionRange(descLength, descLength); // Moves the cursor to the end
      }, 10);
    }
  }

  useEffect(() => {
    if (focus) {
      handleFocus("title");
    };
  }, [focus]);

  return (
    <div className={`Task my-1.5 bg-gray-100 hover:bg-gray-200 ${(isFocused || isFocused) && "bg-gray-200"}`}>
      <div className={`relative p-2.5 flex items-start gap-2.5 ${task.isDone ? "opacity-40" : ""}`}>

        {/* CHECKBOX */}
        <div onClick={() => handleUpdateTask(task.id, { isDone: !task.isDone })} className="w-5 h-5 mt-0.5 flex-shrink-0">
          <div className={`w-full h-full border-2 cursor-pointer ${task.isDone ? "bg-black" : ""}`}/>
        </div>

        {/* TASK TITLE AND DESCRIPTION */}
        <div className={`flex flex-col grow overflow-hidden ${task.isDone ? "opacity-40" : ""}`}>

          <div
            className={`text-2xl font-bold leading-[26px] text-ellipsis overflow-hidden line-clamp-3 ${task.isDone && "line-through"} ${isFocused && "hidden"}`}
            onClick={() => handleFocus("title")}
          >
            {newTitle || "Click to add a title..."}
          </div>

          <TextareaAutosize
            ref={titleArea}
            tabIndex={0}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            // maxRows={isFocused ? 999 : 2}
            className={`text-2xl font-bold leading-[26px] box-content pr-5 outline-0 overflow-hidden resize-none ${!isFocused && "hidden"}`}
          />

          <div
            className={`opacity-70 text-ellipsis overflow-hidden line-clamp-2 ${isFocused && "hidden"}`}
            onClick={() => handleFocus("desc")}
          >
            {newDescription || "Click to add a description..."}
          </div>

          <TextareaAutosize
            ref={descArea}
            tabIndex={0}
            placeholder="Add Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={handleBlur}
            onFocus={() => setIsFocused(true)}
            // maxRows={isFocused ? 999 : 1}
            className={`outline-0 opacity-70 overflow-hidden resize-none ${
              !isFocused ? "hidden" : ""
            }`}
          />
        
        </div>

        {/* DELETE BUTTON */}
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="text-xl leading-4 p-1 -mt-1 -mr-1 cursor-pointer opacity-50 hover:opacity-100 select-none flex-shrink-0"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Task;