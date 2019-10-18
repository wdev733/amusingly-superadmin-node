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

const Customer = {
  getCustomerById,
  getCustomerList,
  updateCustomerStatus,
  getCustomerListWithInsta
};

export default Customer;
