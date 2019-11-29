const database = require('../../../services/mysql');

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

const getInstaPostLink = async (instaId) => {
  const query = "SELECT * FROM insta_related_post WHERE customer_insta_id = " + instaId;
  const postList = await database.query(query);
  if (postList.length === 0) {
    return false;
  } else {
    return postList[0];
  }
}

const updateInstaPostLink = async (instaId, url1, url2, url3, url4, url5, url6) => {
  const query = 'UPDATE insta_related_post SET ' +
    "link1_url = '" + url1 + "', " +
    "link2_url = '" + url2 + "', " +
    "link3_url = '" + url3 + "', " +
    "link4_url = '" + url4 + "', " +
    "link5_url = '" + url5 + "', " +
    "link6_url = '" + url6 + "'" +
    "WHERE customer_insta_id = '" + instaId + "'";

  const ret = await database.query(query);
  return ret;
}

const addNewInstaPostLink = async (instaId, customerId, url1, url2, url3, url4, url5, url6) => {

  const query = 'Insert into insta_related_post (customer_id, customer_insta_id, ' +
    ' link1_url, link2_url, link3_url, link4_url, link5_url, link6_url) value ' +
    '(' +
    "'" + customerId + "', " +
    "'" + instaId + "', " +
    "'" + url1 + "', " +
    "'" + url2 + "', " +
    "'" + url3 + "', " +
    "'" + url4 + "', " +
    "'" + url5 + "', " +
    "'" + url6 + "' " +
    ')';

  const ret = await database.query(query);
  return ret;
};

const updateInstaImageStatus = async (instaId, status) => {
  const query = "UPDATE customer_insta SET Status = '" + status + "' WHERE CustomerInstaID = '" + instaId + "'";
  const ret = await database.query(query);
  return ret;
};

const CustomerInsta = {
  getCustomerInstaById,
  deleteCustomInstaByCustomerId,
  getInstaPostLink,
  updateInstaPostLink,
  addNewInstaPostLink,
  updateInstaImageStatus
};

export default CustomerInsta;
