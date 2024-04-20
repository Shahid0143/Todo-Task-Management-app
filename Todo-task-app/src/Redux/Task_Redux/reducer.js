import {
  ADDTASK_FAILURE,
  ADDTASK_REQUEST,
  ADDTASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  GET_TASK_FAILURE,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../ActionTypes";

const initialState = {
  tasks: [],

  loading: false,
  error: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
    case ADDTASK_REQUEST:
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };

    case GET_TASK_FAILURE:
    case ADDTASK_FAILURE:
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADDTASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_TASK_SUCCESS:
      const { id, newStatus } = action.payload;
      return {
        ...state,
        data: state.data.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task
        ),
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
