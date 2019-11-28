import { Router } from 'express';
import { getCustomerByUserNameAndPassword } from '../../v_admin/customer/model';
import { login } from './controller';

const router = new Router();

/**
 * @api {post} /api/account/login Account Login
 * @apiName Authenticate
 * @apiGroup account
 * @apiParam {email, password}
 */
router.post('/login', getCustomerByUserNameAndPassword(), login);

export default router;
