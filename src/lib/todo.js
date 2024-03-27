// param email return array isi dari todo
const readAllTodo = (email) => {
  let todos = [];
  const key = "todo-" + email;
  const data = localStorage.getItem(key);
  if (data && data.length > 0) {
    todos = JSON.parse(data);
  }
  return {
    success: true,
    todos,
  };
};

// param taks todo, key item didelete return array todo setelah didelete melakukan penghapusan atau mereplace data di local storage
const deleteTodo = (email, todoKey) => {
  let todos = [];

  const key = "todo-" + email;
  const data = localStorage.getItem(key);
  if (data && data.length > 0) {
    todos = JSON.parse(data);
  }

  if (todos.length > 0) {
    // linear search
    let foundIndex = -1;
    for (let a = 0; a < todos.length; a++) {
      if (todos[a].key == todoKey) {
        foundIndex = a;
        break;
      }
    }
    if (foundIndex != -1) {
      todos.splice(foundIndex, 1);

      // save
      localStorage.setItem(key, JSON.stringify(todos));

      return {
        success: true,
      };
    }
  }
  return {
    success: false,
    message: "Gagal menghapus todo " + key,
  };
};

const addTodo = (email, newTodo) => {
  let todos = [];
  const key = "todo-" + email;
  const data = localStorage.getItem(key);
  if (data && data.length > 0) {
    todos = JSON.parse(data);
  }

  todos.push(newTodo);

  // save
  localStorage.setItem(key, JSON.stringify(todos));

  return {
    success: true,
  };
};

const editTodo = (email, todoKey, newTodo) => {
  let todos = [];
  const key = "todo-" + email;
  const data = localStorage.getItem(key);
  if (data && data.length > 0) {
    todos = JSON.parse(data);
  }
  if (todos.length > 0) {
    // melakukan linear search
    let index = -1;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key == todoKey) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      todos[index] = newTodo;
      localStorage.setItem(key, JSON.stringify(todos));

      return {
        success: true,
      };
    }
  }
  return {
    success: false,
    message: "Gagal mengedit todo " + key,
  };
};

export { readAllTodo, addTodo, deleteTodo, editTodo };
