import { Router } from 'express';
import {
  getWidget,
  getWidgetList,
  addNewWidget,
  updateWidget,
  deleteWidget } from './controller';

const router = new Router();

/**
 * @api {get} /api/widget/:id Retrieve Widget
 * @apiName Retrieve Widget
 * @apiGroup Widget
 * @apiSuccess {Object} widget
 */
router.get(
  '/w/:_id',
  getWidget
);

/**
 * @api {get} /api/widget/list Retrieve Widget List by CustomerID
 * @apiName Retrieve Widget List By Customer
 * @apiGroup widget
 * @apiSuccess {widget[]} widget list
 */
router.get(
  '/list',
  getWidgetList
);

/**
 * @api {post} /api/widget/add Add New Widget
 * @apiName Add New Widget
 * @apiGroup widget
 * @apiSuccess {boolean} result
 */
router.post(
  '/add',
  addNewWidget
);

router.post(
  '/update',
  updateWidget
);

router.post(
  '/delete',
  deleteWidget
);

export default router;
