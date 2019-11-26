const database = require('../../../services/mysql');

const getUserInfoByUserName = async userName => {
  const admin = await database.query("SELECT * FROM admin where UserName='" + userName + "'");
  if (admin.length === 0) {
    return false;
  } else {
    return admin[0];
  }
};

const getUserInfoById = async id => {
  const admin = await database.query("SELECT * FROM admin where AdminID='" + id + "'");
  if (admin.length === 0) {
    return false;
  } else {
    return admin[0];
  }
};

const checkPassword = (admin, password) => {
  if (admin.Password === password) {
    return true;
  } else {
    return false;
  }
};

const Account = { getUserInfoByUserName, getUserInfoById, checkPassword };

export default Account;
