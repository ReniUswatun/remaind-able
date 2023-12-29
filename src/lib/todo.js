const readAllTodos = (email) => {
  const data = localStorage.getItem("todo-" + email);
  if (!data) return [];
  const todos = JSON.parse(data);
  return todos;
};

const addTodo = (email, title, date) => {};

const removeTodo = (email) => {};

export { addTodo, readAllTodos, removeTodo };
