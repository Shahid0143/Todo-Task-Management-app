import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";
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
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const tasks = useSelector((state) => state.task.tasks.data);

  useEffect(() => {
    dispatch(getTASKS());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handletoggle = (id, currentStatus) => {
    const newStatus = currentStatus;
    dispatch(updateTask(id, newStatus));
    toast.success(newStatus ? "Task Completed" : "Task Marked Pending");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handlepriority = (id, currentPriority) => {
    dispatch(updatePriority(id, currentPriority));
    toast.success("Priority Set to " + currentPriority);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleDelete = async (id) => {
    setDeletingTaskId(id);
    try {
      await dispatch(deleteTask(id));
      toast.success("Task deleted successfully");
      dispatch(getTASKS());
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred while deleting the task");
    } finally {
      setTimeout(() => {
        setDeletingTaskId(null);
        window.location.reload();
      }, 2000);
    }
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
    <div>
      <div className="grid grid-cols-3 gap-4 bg-gray-700">
        {currentTasks.map((task, index) => (
          <div key={index} className="p-4 border rounded relative card">
            <div className="smoke-background"></div>
            <div className="card-content">
              <div className="flex justify-end">
                <img
                  src="https://i.pinimg.com/736x/88/2a/69/882a69ba218a96552bc68a99ca410198.jpg"
                  alt="Dummy"
                  className="w-20 h-20 rounded-full"
                  style={{ padding: "1px" }}
                />
              </div>
              <div>
                {!editMode || editMode !== task._id ? (
                  <h3 className="text-lg font-semibold mt-1 ">{task.title}</h3>
                ) : (
                  <input
                    type="text"
                    name="title"
                    value={editedTask.title}
                    onChange={handleEditChange}
                  />
                )}
                {!editMode || editMode !== task._id ? (
                  <p className="text-sm">{task.description}</p>
                ) : (
                  <textarea
                    className=" mt-2"
                    name="description"
                    value={editedTask.description}
                    onChange={handleEditChange}
                  />
                )}
              </div>
              <div className="mt-4">
                <strong>Priority : </strong>
                <select
                  className="p-2 border rounded"
                  name="priority"
                  value={task.priority}
                  onChange={(e) => handlepriority(task._id, e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="mt-4">
                <strong>Status : </strong>
                <select
                  className={` p-2 ml-3 border rounded ${
                    task.status ? "bg-green-500" : "bg-red-500"
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
              </div>
              <div className="mt-4 flex gap-3 ">
                {!editMode || editMode !== task._id ? (
                  <>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                      onClick={() => handleDelete(task._id)}
                      disabled={deletingTaskId === task._id}
                    >
                      {deletingTaskId === task._id ? (
                        <FaSpinner className="animate-spin mr-2" />
                      ) : (
                        <FaTrash className="mr-2" />
                      )}
                      DELETE
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
                      onClick={() => toggleEditMode(task._id)}
                    >
                      <FaEdit className="mr-2" />
                      EDIT
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => submitEdit(task._id)}
                    >
                      SAVE
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => setEditMode(null)}
                    >
                      CANCEL
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-5 py-2 rounded mr-2"
        >
          Previous
        </button>
        <p className="text-xl font-semibold mt-3 ">{currentPage}</p>{" "}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentTasks.length < itemsPerPage}
          className="bg-blue-500 text-white px-5 py-2 rounded ml-2"
        >
          Next
        </button>
      </div>
      <style jsx>{`
        .smoke-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("https://www.transparenttextures.com/patterns/dark-wood.png");
          z-index: -1;
          opacity: 0.3;
        }
        .card-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

export default TaskItem;
