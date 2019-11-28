import { Router } from 'express';
import { login, loginByAccessToken } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

/**
 * @api {post} /api/client/login Client Login
 * @apiName Authenticate
 * @apiGroup client
 * @apiParam {username, password}
 */
router.post('/login', login);

/**
 * @api {post} /api/client/login-token Client Login
 * @apiName Authenticate
 * @apiGroup client
 * @apiParam { accessToken }
 */
router.post('/login-token', loginByAccessToken);

export default router;
