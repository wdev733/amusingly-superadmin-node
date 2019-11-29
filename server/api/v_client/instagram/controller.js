import { handleError, handleSuccess } from '../../../services/response';

import Customer from '../../v_admin/customer/model';
import CustomerInsta from '../../v_admin/insta_images/model';

export const instagramImageList = async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    let data = []

    if (customer !== false) {
      const customerID = customer.CustomerID;
      const instagramList = await Customer.getCustomerListWithInsta(customerID);
      
      if (instagramList !== false) {
        for (let i = 0; i < instagramList.length; i++) {
          const instagramItem = {
            CustomerInstaID: instagramList[i].CustomerInstaID,
            ImageInstaUrl : instagramList[i].ImageInstaUrl,
            ImageUrl : instagramList[i].ImageUrl,
            ImageLikes : instagramList[i].ImageLikes,
            ImageCaption: instagramList[i].ImageCaption,
            Status : instagramList[i].Status,
          } 
          data.push(instagramItem);
        }
      }
    }

    handleSuccess(res, { data } );
  } catch (err) {
    handleError(res, err);
  }
};

export const updateInstagramImageStatus = async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    let data = []

    if (customer !== false) {
      const { insta_id, status } = req.body;
      
      CustomerInsta.updateInstaImageStatus(insta_id, status);
    }

    handleSuccess(res, { data } );
  } catch (err) {
    handleError(res, err);
  }
};