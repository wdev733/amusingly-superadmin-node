import { Router } from 'express';
import { instagramImageList, updateInstagramImageStatus } from './controller';

const router = new Router();

/**
 * @api {GET} /api/instagram Get Client Instagram Image List
 * @apiName Instagram
 * @apiGroup client
 * @apiParam {  }
 */
router.get('/images', instagramImageList);

/**
 * @api {post} /api/instagram/status Change Instagram Image Status
 * @apiName Instagram
 * @apiGroup client
 * @apiParam { insta_id, status}
 */
router.post('/status', updateInstagramImageStatus);

export default router;