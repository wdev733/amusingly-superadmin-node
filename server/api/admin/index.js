import { Router } from 'express';
import { getAdminList, getAvailableAdminCount } from './controller';
import { token } from '../../services/passport';

const router = new Router();

/**
 * @api {get} /api/admin/list Retrieve Admin
 * @apiName RetrieveAdmin
 * @apiGroup admin
 * @apiSuccess {Object} admin list
 */
router.get(
  '/list',
  token({
    required: true
  }),
  getAdminList
);

/**
 * @api {get} /api/admin/available_cnt Retrieve Available Admin Count
 * @apiName Retrieve Available Admin Count
 * @apiGroup admin
 * @apiSuccess {Int} available admin count
 */
router.get(
  '/available_cnt',
  token({
    required: true
  }),
  getAvailableAdminCount
);

export default router;
