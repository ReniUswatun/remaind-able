const keyAccounts = "accounts";
const keySession = "session";

const readAllAccount = () => {
  const data = localStorage.getItem(keyAccounts);
  if (!data) return [];
  //melakukan return berupa data yang didalam accounts
  return JSON.parse(data);
};

//untuk nyimpen kedalam local storage
const saveAccounts = (accounts) => {
  const data = JSON.stringify(accounts);
  localStorage.setItem(keyAccounts, data);
};

//return isSucces (bool) dan massage (String)
const checkAuthentication = (email, password) => {
  const accounts = readAllAccount();
  let index = -1;
  for (let a = 0; a < accounts.length; a++) {
    if (accounts[a].email == email) {
      index = a;
      break;
    }
  }

  if (index == -1) {
    alert("email not found");
    return {
      isSuccess: false,
      message: "Email tidak ditemukan!",
    };
  }

  // validasi password
  if (accounts[index].password == password) {
    // save session
    localStorage.setItem(
      keySession,
      JSON.stringify({
        user: accounts[index].user,
        email: accounts[index].email,
      })
    );

    return {
      isSuccess: true,
    };
  } else {
    alert("Wrong password");
    return {
      isSuccess: false,
      message: "Kata sandi tidak cocok!",
    };
  }
};

const createAccount = (username, email, password) => {
  const accounts = readAllAccount();

  // melakukan linear search disini
  let isExists = false;
  for (let a = 0; a < accounts.length; a++) {
    if (accounts[a].email == email) {
      isExists = true;
      break;
    }
  }

  if (isExists) {
    alert("Failed to register, email is already registered");
    return {
      isSuccess: false,
      message: "Alamat email telah didaftarkan",
    };
  }

  accounts.push({ username, email, password });
  saveAccounts(accounts);
  createNewUser(email);

  return {
    isSuccess: true,
  };
};

const logout = () => {
  localStorage.removeItem(keySession);
};

const getSession = () => {
  const data = localStorage.getItem(keySession);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const createNewUser = (email) => {
  const keyNewUser = `todo-${email}`;
  localStorage.setItem(keyNewUser, []);
};

export { getSession, checkAuthentication, createAccount, logout };
