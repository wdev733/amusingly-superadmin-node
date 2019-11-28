import { handleError, handleSuccess } from '../../../services/response';

import Customer from '../../v_admin/customer/model';

export const login = async (req, res, next)=> {
  try {
    const { username, password } = req.body;

    const customer = await Customer.getCustomerByUserNameAndPassword(username, password);

    let token = '';
    let account = {};

    if (customer != false) {
      token = customer.AccessToken;
      account = {
        ...customer 
      }
    }

    handleSuccess(res, { token, account } );
  } catch (err) {
    handleError(res, err);
  }
};

export const loginByAccessToken = async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);
    
    let token = '';
    let account = {};

    if (customer != false) {
      token = customer.AccessToken;
      account = {
        ...customer 
      }
    }

    handleSuccess(res, { token, account } );
  } catch (err) {
    handleError(res, err);
  }
};