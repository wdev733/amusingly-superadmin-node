import { Router } from 'express';
import { 
  getCustomer,
  getCustomerList,
  updateCustomerStatus,
  getCustomerWithInstaList,
  addNewCustomer,
  editNewCustomer } from './controller';
import { token } from '../../services/passport';

const router = new Router();

/**
 * @api {get} /api/customer/:id Retrieve Customer
 * @apiName Retrieve Customer
 * @apiGroup customer
 * @apiSuccess {Object} customer
 */
router.get(
  '/c/:_id',
  token({
    required: true
  }),
  getCustomer
);

/**
 * @api {get} /api/customer/list Retrieve Customer List
 * @apiName Retrieve Customer List
 * @apiGroup customer
 * @apiSuccess {object} customer list
 */
router.get(
  '/list',
  token({
    required: true
  }),
  getCustomerList
);

/**
 * @api {get} /api/customer/insta_list Retrieve Customer with Insta List
 * @apiName Retrieve Customer List With Insta
 * @apiGroup customer
 * @apiSuccess {object} customer list
 */
router.get(
  '/insta_list/:_id',
  token({
    required: true
  }),
  getCustomerWithInstaList
);

/**
 * @api {post} /api/customer/status Update Customer Status
 * @apiName Update Customer Status
 * @apiGroup customer
 * @apiSuccess {boolean} result
 */
router.post(
  '/status',
  token({
    required: true
  }),
  updateCustomerStatus
);

/**
 * @api {post} /api/customer/add Add New Customer
 * @apiName Add New Customer
 * @apiGroup customer
 * @apiSuccess {boolean} result
 */
router.post(
  '/add',
  token({
    required: true
  }),
  addNewCustomer
);

router.post(
  '/edit',
  token({
    required: true
  }),
  editNewCustomer
);

export default router;
