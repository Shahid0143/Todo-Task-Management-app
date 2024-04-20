import axios from "axios";

import {
  ADDTASK_FAILURE,
  ADDTASK_REQUEST,
  ADDTASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_TASK_FAILURE,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
} from "../ActionTypes";
import toast from "react-hot-toast";

export const gettaskRequest = () => ({
  type: GET_TASK_REQUEST,
});

export const gettaskSuccess = (tasks) => ({
  type: GET_TASK_SUCCESS,
  payload: tasks,
});

export const gettaskFailure = (error) => ({
  type: GET_TASK_FAILURE,
  payload: error,
});

export const getTASKS = () => async (dispatch) => {
  dispatch(gettaskRequest());

  try {
    const token = localStorage.getItem("logintoken");

    const response = await axios.get(
      "https://todo-backend-1brf.onrender.com/task",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    dispatch(gettaskSuccess(response.data));
  } catch (error) {
    dispatch(gettaskFailure(error.message));
  }
};

// addd task

export const addtaskRequest = () => ({
  type: ADDTASK_REQUEST,
});

export const addtaskSuccess = (task) => ({
  type: ADDTASK_SUCCESS,
  payload: task,
});

export const addtaskFailure = (error) => ({
  type: ADDTASK_FAILURE,
  payload: error,
});

export const addtask = (newTask) => async (dispatch) => {
  dispatch(addtaskRequest());

  try {
    const token = localStorage.getItem("logintoken");
    const response = await axios.post(
      "https://todo-backend-1brf.onrender.com/task/add",
      newTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.msg, {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });

    dispatch(addtaskSuccess(response.data));
  } catch (error) {
    dispatch(addtaskFailure(error));
    toast.error(error.response?.data?.msg, {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
  }
};

//  update

export const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});
export const updateTaskSuccess = (id, newStatus) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: { id, newStatus },
});
export const updateTaskRequest = () => ({
  type: GET_TASK_REQUEST,
});
export const updateTask = (taskId, newStatus) => async (dispatch) => {
  dispatch(updateTaskRequest());

  try {
    const token = localStorage.getItem("logintoken");
    const response = await axios.patch(
      `https://todo-backend-1brf.onrender.com/task/update/${taskId}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from API:", response.data);
    dispatch(updateTaskSuccess(taskId, newStatus));
    console.log("Updated task:", taskId, newStatus);
  } catch (error) {
    dispatch(updateTaskFailure(error.msg));
  }
};

export const updatePriority = (taskId, newPriority) => async (dispatch) => {
  dispatch(updateTaskRequest());

  try {
    const token = localStorage.getItem("logintoken");
    const response = await axios.patch(
      `https://todo-backend-1brf.onrender.com/task/update/${taskId}`,
      { priority: newPriority },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from API:", response.data);
    dispatch(updateTaskSuccess(taskId, newPriority));
    console.log("Updated task:", taskId, newPriority);
    console.log("priority");
  } catch (error) {
    console.log("priority");
    dispatch(updateTaskFailure(error.msg));
  }
};

//  delete

export const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(deleteTaskRequest());

  try {
    const token = localStorage.getItem("logintoken");
    await axios.delete(
      `https://todo-backend-1brf.onrender.com/task/delete/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(deleteTaskSuccess(taskId));
    toast.success("Task deleted successfully");
  } catch (error) {
    dispatch(deleteTaskFailure(error.message));
  }
};
