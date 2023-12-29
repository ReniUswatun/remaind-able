const keyAccounts = "accounts";
const keySession = "session";

// return array of user
const readAllAccounts = () => {
  const data = localStorage.getItem(keyAccounts);
  if (!data) return [];
  return JSON.parse(data);
};

const saveAccounts = (accounts) => {
  const data = JSON.stringify(accounts);
  localStorage.setItem(keyAccounts, data);
};

// return Result
const login = (email, password) => {
  const accounts = readAllAccounts();

  // linear search
  let index = -1;
  for (let a = 0; a < accounts.length; a++) {
    if (accounts[a].email == email) {
      index = a;
      break;
    }
  }

  if (index == -1) {
    return {
      success: false,
      message: "Alamat email tidak ditemukan!",
    };
  }

  // validasi password
  if (accounts[index].password == password) {
    // save session
    localStorage.setItem(
      keySession,
      JSON.stringify({
        username: accounts[index].username,
        email: accounts[index].email,
      })
    );

    return {
      success: true,
    };
  } else {
    return {
      success: false,
      message: "Kata sandi tidak cocok!",
    };
  }
};

// return Result
const register = (username, email, password) => {
  const accounts = readAllAccounts();

  // linear search
  let isExists = false;
  for (let a = 0; a < accounts.length; a++) {
    if (accounts[a].email == email) {
      isExists = true;
      break;
    }
  }

  if (isExists) {
    return {
      success: false,
      message: "Alamat email telah didaftarkan",
    };
  }

  accounts.push({ username, email, password });
  saveAccounts(accounts);

  return {
    success: true,
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

export { getSession, login, logout, register };
