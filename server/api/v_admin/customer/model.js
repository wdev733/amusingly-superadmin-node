const database = require('../../../services/mysql');

const getCustomerById = async customerId => {
  const customerList = await database.query("select * from customer where CustomerID = '" + customerId + "'");
  if (customerList.length === 0) {
    return false;
  } else {
    return customerList[0];
  }
};

const getCustomerList = async () => {
  const customerList = await database.query('select customer.*,  count(customer_insta.CustomerInstaID) as InstaImageCount from customer left join customer_insta on (customer.CustomerID = customer_insta.CustomerID) group by customer.CustomerID Order by CustomerID DESC');
  if (customerList.length === 0) {
    return false;
  } else {
    return customerList;
  }
};

const updateCustomerStatus = async (customerId, status) => {
  if (status === 0) {
    await database.query("update customer set status = 1 where CustomerID = '" + customerId + "'");
  } else {
    await database.query("update customer set status = 0 where CustomerID = '" + customerId + "'");
  }
};

const deleteCustomer = async (customerId) => {
  await database.query("delete from customer where CustomerID = '" + customerId + "'");
};

const getCustomerListWithInsta = async customerId => {
  const customerList = await database.query(
    'select customer.`Name`, customer.`LastSync`,  customer_insta.* from customer' +
    ' inner join customer_insta on' +
    "(customer.CustomerID = customer_insta.CustomerID AND customer_insta.CustomerID = '" + customerId + "')" +
    ' ORDER BY customer_insta.`CustomerInstaID` DESC Limit 10');

  if (customerList.length === 0) {
    return false;
  } else {
    return customerList;
  }
};

const checkCustomerNameDuplicate = async (customerId, userName) => {
  const ret = await database.query("select count(CustomerID) as cnt from customer where UserName='" + userName + "'" +
      ' AND CustomerID <> ' + customerId);
  return ret[0].cnt;
};

const checkCustomerEmailDuplicate = async (customerId, eMail) => {
  const ret = await database.query("select count(CustomerID) as cnt from customer where Email='" + eMail + "'" +
    ' AND CustomerID <> ' + customerId);
  return ret[0].cnt;
};

const checkCustomerUrlKeyDuplicate = async (customerId, UrlKey) => {
  const ret = await database.query("select count(CustomerID) as cnt from customer where UrlKey='" + UrlKey + "'" +
    ' AND CustomerID <> ' + customerId);
  return ret[0].cnt;
};

const addNewCustomer = async (UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2,
  City, Country, State, InstaProfileName, SalesRep, UrlKey, InstaUserId, AccessToken, ProfileLogo, Status, autosyscro) => {

  const query = 'Insert into customer (UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2, ' +
    'City, Country, State, InstaProfileName, SalesRep, UrlKey, InstaUserId, AccessToken, ProfileLogo, LastLogin, LastSync, Status, autosyscro) value ' +
    '(' +
    "'" + UserName + "', " +
    "'" + Password + "', " +
    "'" + Name + "', " +
    "'" + Email + "', " +
    "'" + Phone + "', " +
    "'" + BillingAddress1 + "', " +
    "'" + BillingAddress2 + "', " +
    "'" + City + "', " +
    "'" + Country + "', " +
    "'" + State + "', " +
    "'" + InstaProfileName + "', " +
    "'" + SalesRep + "', " +
    "'" + UrlKey + "', " +
    "'" + InstaUserId + "', " +
    "'" + AccessToken + "', " +
    "'" + ProfileLogo + "', " +
    "'0000-00-00', " +
    "'0000-00-00', " +
    "'" + Status + "', " +
    "'" + autosyscro + "'" +
    ')';

  const ret = await database.query(query);
  return ret;
};

const editNewCustomer = async (CustomerID, UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2,
  City, Country, State, InstaProfileName, SalesRep, UrlKey, InstaUserId, AccessToken, ProfileLogo, Status, autosyscro) => {

  const query = 'UPDATE customer SET ' +
    "UserName = '" + UserName + "', " +
    "Password = '" + Password + "', " +
    "Name = '" + Name + "', " +
    "Email = '" + Email + "', " +
    "Phone = '" + Phone + "', " +
    "BillingAddress1 = '" + BillingAddress1 + "', " +
    "BillingAddress2 = '" + BillingAddress2 + "', " +
    "City = '" + City + "', " +
    "Country = '" + Country + "', " +
    "State = '" + State + "', " +
    "InstaProfileName = '" + InstaProfileName + "', " +
    "SalesRep = '" + SalesRep + "', " +
    "UrlKey = '" + UrlKey + "', " +
    "InstaUserId = '" + InstaUserId + "', " +
    "AccessToken = '" + AccessToken + "', " +
    "ProfileLogo = '" + ProfileLogo + "', " +
    "Status = '" + Status + "', " +
    "autosyscro = '" + autosyscro + "' " +
    "WHERE CustomerID = '" + CustomerID + "'";

  const ret = await database.query(query);
  return ret;
};

const getCustomerByUserNameAndPassword = async (userName, password) => {
  let query = "SELECT * FROM customer Where UserName = '" + userName + "' " +
          " AND Password = '" + password + "' and Status = 1";
  
  const customerList = await database.query(query);
  if (customerList.length === 0) {
    return false;
  } else {
    return customerList[0];
  }
};

const getCustomerByAccessToken = async accessToken => {
  let query = "SELECT * FROM customer WHERE AccessToken = '" + accessToken + "' AND status = 1";
  const customerList = await database.query(query);
  if (customerList.length === 0) {
    return false;
  } else {
    return customerList[0];
  }
}

const Customer = {
  getCustomerById,
  getCustomerList,
  updateCustomerStatus,
  getCustomerListWithInsta,
  checkCustomerNameDuplicate,
  checkCustomerEmailDuplicate,
  checkCustomerUrlKeyDuplicate,
  addNewCustomer,
  editNewCustomer,
  deleteCustomer,
  getCustomerByUserNameAndPassword,
  getCustomerByAccessToken
};

export default Customer;
