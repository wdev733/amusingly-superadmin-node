import { Router } from 'express';
import { getCustomerInstaById } from './controller';
import { token } from '../../services/passport';

const router = new Router();

/**
 * @api {get} /api/customer/:id Retrieve Customer
 * @apiName Retrieve Customer
 * @apiGroup customer
 * @apiSuccess {Object} customer
 */
router.get(
  '/i/:_id',
  token({
    required: true
  }),
  getCustomerInstaById
);

export default router;
