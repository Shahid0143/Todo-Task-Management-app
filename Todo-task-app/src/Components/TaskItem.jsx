import React, { useState, useEffect } from "react";
import {
  deleteTask,
  getTASKS,
  updateTask,
  updatePriority,
} from "../Redux/Task_Redux/action";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function TaskItem() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const [currentTasks, setCurrentTasks] = useState([]);

  const tasks = useSelector((state) => state.task.tasks.data);

  useEffect(() => {
    dispatch(getTASKS());
  }, [dispatch]);

  useEffect(() => {
    // Update currentTasks when tasks change
    setCurrentTasks(tasks.slice(indexOfFirstTask, indexOfLastTask));
  }, [tasks, currentPage]); // Trigger when tasks or currentPage change

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;

  const handletoggle = (id, currentStatus) => {
    const newStatus = currentStatus;
    dispatch(updateTask(id, newStatus));
    toast.success(newStatus ? "Task Completed" : "Task Marked Pending");
  };

  const handlepriority = (id, currentPriority) => {
    dispatch(updatePriority(id, currentPriority));
    toast.success("Priority Set to " + currentPriority);
  };

  const handle_Delete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully");
    dispatch(getTASKS());
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const submitEdit = (id) => {
    dispatch(updateTask(id, editedTask));
    setEditMode(null);

    // Update the edited task in currentTasks
    const index = currentTasks.findIndex((task) => task._id === id);
    const updatedTasks = [...currentTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      title: editedTask.title,
      description: editedTask.description,
    };
    setCurrentTasks(updatedTasks);
    // Clear the editedTask state
    setEditedTask({
      title: "",
      description: "",
      priority: "",
    });
    toast.success("Task edited successfully");
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    const taskToEdit = tasks.find((task) => task._id === id);
    setEditedTask({
      title: taskToEdit.title,
      description: taskToEdit.description,
      priority: taskToEdit.priority,
      status: taskToEdit.status,
    });
  };

  return (
    <>
      <div className="todoContainer mx-auto px-4 md:w-2/3">
        {currentTasks.map((task, index) => (
          <div key={index} className="todoItems">
            <div className="task-list-data">
              <strong>Title : </strong>
              {!editMode || editMode !== task._id ? (
                <h3 className="task-text">{task.title}</h3>
              ) : (
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleEditChange}
                />
              )}
              <strong>Description : </strong>
              {!editMode || editMode !== task._id ? (
                <p className="description">{task.description}</p>
              ) : (
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleEditChange}
                />
              )}
              <strong>Priority : </strong>
              <select
                className="priority p-2 border border-gray-300 rounded"
                name="priority"
                value={task.priority}
                onChange={(e) => handlepriority(task._id, e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="urgent">Urgent</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <strong>Status : </strong>
              <select
                className={`priority p-2 border border-gray-300 rounded ${
                  task.status ? "green" : "red"
                }`}
                name="priority"
                value={task.status ? "Completed" : "Pending"}
                onChange={(e) =>
                  handletoggle(
                    task._id,
                    e.target.value === "Completed" ? true : false
                  )
                }
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              {!editMode || editMode !== task._id ? (
                <>
                  <button
                    className="del_btn"
                    onClick={() => handle_Delete(task._id)}
                  >
                    DELETE
                  </button>
                  <button
                    className="edit_btn"
                    onClick={() => toggleEditMode(task._id)}
                  >
                    EDIT
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit_btn"
                    onClick={() => submitEdit(task._id)}
                  >
                    SAVE
                  </button>
                  <button
                    className="edit_btn"
                    style={{ backgroundColor: "tomato" }}
                    onClick={() => setEditMode(null)}
                  >
                    CANCEL
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="pagination flex items-center justify-center gap-1 mt-4">
        {Array.from(
          { length: Math.ceil(tasks?.length / itemsPerPage) },
          (_, i) => (
            <li key={i} className="page-item">
              <button
                onClick={() => handlePageChange(i + 1)}
                className="page-link"
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default TaskItem;
