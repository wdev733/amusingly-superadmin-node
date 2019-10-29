const database = require('../../services/mysql');

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

  let query = 'Insert into customer (UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2, ' +
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

  console.log(query);

  const ret = await database.query(query);
  return ret;
};

const editNewCustomer = async (CustomerID, UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2,
  City, Country, State, InstaProfileName, SalesRep, UrlKey, InstaUserId, AccessToken, ProfileLogo, Status, autosyscro) => {

  let query = 'UPDATE customer SET ' +
    "UserName = '" + UserName + "', " +
    "Password = '" + UserName + "', " +
    "Name = '" + UserName + "', " +
    "Phone = '" + UserName + "', " +
    "BillingAddress1 = '" + UserName + "', " +
    "BillingAddress2 = '" + UserName + "', " +
    "City = '" + UserName + "', " +
    "Country = '" + UserName + "', " +
    "State = '" + UserName + "', " +
    "InstaProfileName = '" + UserName + "', " +
    "SalesRep = '" + UserName + "', " +
    "UrlKey = '" + UserName + "', " +
    "InstaUserId = '" + UserName + "', " +
    "AccessToken = '" + UserName + "', " +
    "ProfileLogo = '" + UserName + "', " +
    "Status = '" + UserName + "', " +
    "autosyscro = '" + UserName + "' " +
    "WHERE CustomerID = '" + CustomerID + "'";

  console.log(query);

  const ret = await database.query(query);
  return ret;
};

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
  deleteCustomer
};

export default Customer;