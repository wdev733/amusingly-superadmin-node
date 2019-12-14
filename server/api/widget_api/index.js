import { Router } from 'express';
import { getWidgetByKey, getWidgetSliderByKey } from './controller';

const router = new Router();

/**
 * @api {get} /api/widget/:id Retrieve Widget
 * @apiName Retrieve Widget
 * @apiGroup Widget
 * @apiSuccess {Object} widget
 */
router.get('/block', getWidgetByKey);
router.get('/slider', getWidgetSliderByKey);

export default router;
