const { getSession } = require("./auth");

const session = getSession();
const rows = readAllTodo(session.email);

export { session, dataTodo };
