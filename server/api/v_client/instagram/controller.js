import { handleError, handleSuccess } from '../../../services/response';

import Customer from '../../v_admin/customer/model';

export const instagramImageList = async (req, res, next)=> {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.replace('Bearer ', '');

    const customer = await Customer.getCustomerByAccessToken(accessToken);

    let data = []

    if (customer !== false) {
      const customerID = customer.CustomerID;
      
      const instagramList = await Customer.getCustomerListWithInsta(customerID);
      console.log(instagramList);
      if (instagramList !== false) {
        for (let i = 0; i < instagramList.length; i++) {
          const instagramItem = {
            CustomerInstaID: instagramList[i].CustomerInstaID,
            ImageInstaUrl : instagramList[i].ImageInstaUrl,
            ImageUrl : instagramList[i].ImageUrl,
            ImageLikes : instagramList[i].ImageLikes,
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