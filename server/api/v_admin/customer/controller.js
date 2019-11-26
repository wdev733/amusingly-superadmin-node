import { notFound, handleError, handleSuccess } from '../../../services/response/';
import Customer from './model';

export const getCustomer = async (req, res, next) => {
  try {
    let customer = await Customer.getCustomerById(req.params._id);

    if (!customer) {
      return notFound(res);
    }
    handleSuccess(res, { data: customer });
  } catch (err) {
    handleError(res, err);
  }
};

export const getCustomerList = async (req, res, next) => {
  try {
    let customerList = await Customer.getCustomerList();
    handleSuccess(res, { data: customerList });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateCustomerStatus = async (req, res, next) => {
  try {
    let customerId = req.body.customer;
    let status = req.body.status;

    await Customer.updateCustomerStatus(customerId, status);
    handleSuccess(res);
  } catch (err) {
    handleError(res, err);
  }
};

export const getCustomerWithInstaList = async (req, res, next) => {
  try {
    let customerId = req.params._id;
    let customerList = await Customer.getCustomerListWithInsta(customerId);
    handleSuccess(res, { data: customerList });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    let customerId = req.body.customer;

    await Customer.deleteCustomer(customerId);
    handleSuccess(res);
  } catch (err) {
    handleError(res, err);
  }
};

export const addNewCustomer = async (req, res, next) => {
  try {
    let CustomerID = req.body.CustomerID;
    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Name = req.body.Name;
    let Email = req.body.Email;
    let Phone = req.body.Phone;
    let BillingAddress1 = req.body.BillingAddress1;
    let BillingAddress2 = req.body.BillingAddress2;
    let City = req.body.City;
    let Country = req.body.Country;
    let State = req.body.State;
    let InstaProfileName = req.body.InstaProfileName;
    let SalesRep = req.body.SalesRep;
    let UrlKey = req.body.UrlKey;
    let InstaUserId = req.body.InstaUserId;
    let AccessToken = req.body.AccessToken;
    let ProfileLogo = req.body.ProfileLogo;
    let Status = req.body.Status;
    let autosyscro = req.body.autosyscro;

    let data = {};

    let fileName = '';

    // let imageFile = req.files.file;
    // imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function (err) {
    //   if (err) {
    //     data = {
    //       result: false, message: 'Uploading photo has failed'
    //     };
    //     handleSuccess(res, { data });
    //     return;
    //   }

    //   fileName = 'public/' + UserName + new Date().getTime() + '.jpg';
    // });

    let userNameUniqueCheck = await Customer.checkCustomerNameDuplicate(CustomerID, UserName);
    if (userNameUniqueCheck !== 0) {
      data = {
        result: false, message: 'UserName must be unique'
      };
      handleSuccess(res, { data });
      return;
    }

    let userEmailUniqueCheck = await Customer.checkCustomerEmailDuplicate(CustomerID, Email);
    if (userEmailUniqueCheck !== 0) {
      data = {
        result: false, message: 'Email must be unique'
      };
      handleSuccess(res, { data });
      return;
    }

    let userUrlKeyUniqueCheck = await Customer.checkCustomerUrlKeyDuplicate(CustomerID, UrlKey);
    if (userUrlKeyUniqueCheck !== 0) {
      data = {
        result: false, message: 'UrlKey must be unique'
      };
      handleSuccess(res, { data });
      return;
    }

    await Customer.addNewCustomer(UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2,
      City, Country, State, InstaProfileName, SalesRep, UrlKey, InstaUserId, AccessToken, fileName, Status, autosyscro);

    data = {
      result: true, message: 'Success'
    };
    handleSuccess(res, { data });
  } catch (err) {
    handleError(res, err);
  }
};

export const editCustomer = async (req, res, next) => {
  try {
    let CustomerID = req.body.CustomerID;
    let UserName = req.body.UserName;
    let Password = req.body.Password;
    let Name = req.body.Name;
    let Email = req.body.Email;
    let Phone = req.body.Phone;
    let BillingAddress1 = req.body.BillingAddress1;
    let BillingAddress2 = req.body.BillingAddress2;
    let City = req.body.City;
    let Country = req.body.Country;
    let State = req.body.State;
    let InstaProfileName = req.body.InstaProfileName;
    let SalesRep = req.body.SalesRep;
    let UrlKey = req.body.UrlKey;
    let InstaUserId = req.body.InstaUserId;
    let AccessToken = req.body.AccessToken;
    let ProfileLogo = req.body.ProfileLogo;
    let Status = req.body.Status;
    let autosyscro = req.body.autosyscro;

    let data = {};

    let fileName = '';

    // let imageFile = req.files.file;
    // imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function (err) {
    //   if (err) {
    //     data = {
    //       result: false, message: 'Uploading photo has failed'
    //     };
    //     handleSuccess(res, { data });
    //     return;
    //   }

    //   fileName = 'public/' + UserName + new Date().getTime() + '.jpg';
    // });

    let userNameUniqueCheck = await Customer.checkCustomerNameDuplicate(CustomerID, UserName);
    if (userNameUniqueCheck !== 0) {
      data = {
        result: false, message: 'UserName must be unique'
      };
      handleSuccess(res, { data });
      return;
    }

    let userEmailUniqueCheck = await Customer.checkCustomerEmailDuplicate(CustomerID, Email);
    if (userEmailUniqueCheck !== 0) {
      data = {
        result: false, message: 'Email must be unique'
      };
      handleSuccess(res, { data });
      return;
    }

    let userUrlKeyUniqueCheck = await Customer.checkCustomerUrlKeyDuplicate(CustomerID, UrlKey);
    if (userUrlKeyUniqueCheck !== 0) {
      data = {
        result: false, message: 'UrlKey must be unique'
      };
      handleSuccess(res, { data });
      return;
    }

    await Customer.editNewCustomer(CustomerID, UserName, Password, Name, Email, Phone, BillingAddress1, BillingAddress2,
      City, Country, State, InstaProfileName, SalesRep, UrlKey, InstaUserId, AccessToken, fileName, Status, autosyscro);

    data = {
      result: true, message: 'Success'
    };
    handleSuccess(res, { data });
  } catch (err) {
    handleError(res, err);
  }
};
