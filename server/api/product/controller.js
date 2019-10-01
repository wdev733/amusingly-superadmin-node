import { handleError, handleSuccess } from '../../services/response/';

export const getProduct = async (req, res, next) => {
  try {
    handleSuccess(res);
  } catch (err) {
    handleError(res, err);
  }
};
