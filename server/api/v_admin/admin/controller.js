import { notFound, handleError, handleSuccess } from '../../../services/response/';
import Admin from './model';

export const getAdminList = async (req, res, next) => {
  try {
    let adminList = await Admin.getAdminList();
    if (!adminList) {
      return notFound(res);
    }
    handleSuccess(res, { data: adminList });
  } catch (err) {
    handleError(res, err);
  }
};

export const getAvailableAdminCount = async (req, res, next) => {
  try {
    let availabeCount = await Admin.getAvailableAdminCount();
    handleSuccess(res, { count: availabeCount });
  } catch (err) {
    handleError(res, err);
  }
};
