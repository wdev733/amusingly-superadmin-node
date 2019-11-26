import { notFound, handleError, handleSuccess } from '../../../services/response/';
import Customer from './model';

export const getCustomerInstaById = async (req, res, next) => {
  try {
    let insta = await Customer.getCustomerInstaById(req.params._id);

    if (!insta) {
      return notFound(res);
    }
    handleSuccess(res, { data: insta });
  } catch (err) {
    handleError(res, err);
  }
};