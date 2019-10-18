import { notFound, handleError, handleSuccess } from '../../services/response/';
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
