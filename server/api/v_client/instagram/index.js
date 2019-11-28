import { Router } from 'express';
import { instagramImageList } from './controller';

const router = new Router();

/**
 * @api {post} /api/instagram Get Client Instagram Image List
 * @apiName Instagram
 * @apiGroup client
 * @apiParam {  }
 */
router.get('/images', instagramImageList);

export default router;