const database = require('../../services/mysql');

const getAdminList = async () => {
  const adminList = await database.query('SELECT * FROM admin order by LastName, FirstName');
  if (adminList.length === 0) {
    return false;
  } else {
    return adminList;
  }
};

const getAvailableAdminCount = async() => {
  const adminList = await database.query('SELECT count(*) as cnt FROM admin where Status=1');
  return adminList[0].cnt;
};

const Admin = {
  getAdminList,
  getAvailableAdminCount
};

export default Admin;
