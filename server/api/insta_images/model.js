const database = require('../../services/mysql');

const getCustomerInstaById = async customerInstaId => {
  const customerInstaList = await database.query("select * from customer_insta where CustomerInstaID = '" + customerInstaId + "'");
  if (customerInstaList.length === 0) {
    return false;
  } else {
    return customerInstaList[0];
  }
};

const deleteCustomInstaByCustomerId = async customerId => {
  await database.query("delete from customer_insta where CustomerID = '" + customerId + "'");
  return true;
};

const CustomerInsta = {
  getCustomerInstaById,
  deleteCustomInstaByCustomerId
};

export default CustomerInsta;
