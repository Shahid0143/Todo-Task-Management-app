import React, { useEffect, useState } from "react";
import { addtask, getTASKS } from "../Redux/Task_Redux/action";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import TaskSkeleton from "./TaskSkeleton"; // Import TaskSkeleton component
import { FiLoader } from "react-icons/fi";

const Task = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  
  const tasks = useSelector((state) => state.task.tasks.data);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: false,
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const submitTaskData = () => {
    setIsAddingTask(true);
    setIsLoading(true);
    dispatch(addtask(taskData)).then(() => {
      setIsAddingTask(false);
      setIsLoading(false);
      setTaskData({
        title: "",
        description: "",
        status: false,
        priority: "",
      });
    });
  };

  useEffect(() => {
    dispatch(getTASKS());
  }, []);

  return (
    <>
      <div className="main-container-todo">
        <div className="cont w-[25%] todo-container max-w-lg p-5 rounded-lg shadow-md">
          <h2 className="todo text-center text-2xl">Todo List</h2>
          <div className="data flex justify-between">
            <p className="task-count"></p>
            <p className="completed-count"></p>
          </div>

          <div className="input-container flex flex-col gap-2">
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Add a new task"
              className="task-input flex-grow p-2 border border-gray-300 rounded text-black"
            />
            <select
              className="priority p-2 border border-gray-300 rounded"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option value="urgent">Urgent</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <textarea
              value={taskData.description}
              onChange={handleChange}
              name="description"
              id=""
              cols="30"
              rows="10"
              className="desc p-2 border border-gray-300 rounded"
            ></textarea>
            <button
              onClick={submitTaskData}
              className="add-button text-white p-2 rounded cursor-pointer relative flex items-center justify-center"
              style={{ minWidth: "100px" }}
            >
              {isAddingTask ? (
                <FiLoader className="animate-spin h-5 w-5 mr-2" />
              ) : (
                "Add Task"
              )}
            </button>
          </div>
        </div>
        <div className="todoContainerMain">
         
          {tasks ? (
            isLoading ? (
              <TaskSkeleton />
            ) : (
              <TaskItem data={tasks} />
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Task;
