import {
  knapsackFractionalData,
  pushDataToNewArray,
  pushDataToNewArrayKnapSack,
} from "./algoritma";
import { readAllTodo } from "./todo";

const getNewData = (email) => {
  let newData = [];
  const dataTodo = readAllTodo(email);
  if (dataTodo && dataTodo.todos) {
    pushDataToNewArray(newData, dataTodo.todos);
  }
  if (newData && newData.length > 0) {
    return {
      isSuccess: true,
      newData,
    };
  }
  return {
    isSuccess: false,
  };
};
const getNewDataKnapscak = (email, capacity) => {
  let newData = [];
  const dataTodo = readAllTodo(email);
  let finalValue = 0;
  if (dataTodo && dataTodo.todos) {
    pushDataToNewArrayKnapSack(newData, dataTodo.todos);
    finalValue = knapsackFractionalData(newData, capacity);
  }
  if (newData && newData.length > 0) {
    return {
      isSuccess: true,
      newData,
      finalValue,
    };
  }
  return {
    isSuccess: false,
    newData,
  };
};
export { getNewData, getNewDataKnapscak };
