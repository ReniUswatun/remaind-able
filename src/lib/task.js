// param email return array isi dari todo
const readAllTodo = (email) => {
  const dataTodo = localStorage.getItem("todo-" + email);
  if (!dataTodo) return [];
  return dataTodo;
};

// param taks todo, key item didelete return array todo setelah didelete melakukan penghapusan atau mereplace data di local storage
const deleteArrayAndReplace = (dataTodo, idTodoDelete, email) => {
  //pencarian index
  const newDataTodo = dataTodo.filter((item) => item.id !== idTodoDelete);
  dataTodo = newDataTodo;
  localStorage.setItem("todo-" + email, JSON.stringify(dataTodo));
  return dataTodo;
};

const addTodo = (dataTodo, newTodo, email) => {
  // Tambahkan tugas baru ke array
  dataTodo.push(newTodo);

  // Simpan perubahan di localStorage
  localStorage.setItem("todo-" + email, JSON.stringify(dataTodo));

  // Jika perlu, lakukan operasi lain setelah menambah
  // ...

  return dataTodo; // Kembalikan array yang sudah diubah
};

const editTodo = (dataTodo, editedTodo) => {
  // Cek apakah tugas dengan ID yang sama sudah ada
  const existingTodoIndex = dataTodo.findIndex(
    (item) => item.id === editedTodo.id
  );

  if (existingTodoIndex !== -1) {
    // Jika tugas sudah ada, lakukan edit
    dataTodo[existingTodoIndex] = editedTodo;

    // Simpan perubahan di localStorage
    localStorage.setItem("todo-" + email, JSON.stringify(dataTodo));
  } else {
    console.error("Tugas tidak ditemukan untuk diedit.");
  }
  return dataTodo; // Kembalikan array yang sudah diubah
};

export { readAllTodo, deleteArrayAndReplace, addTodo, editTodo };
