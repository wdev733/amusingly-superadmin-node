import { Router } from 'express';

import account from './account';
import admin from './admin';
import customer from './customer';
import insta_images from './insta_images';

const router = new Router();

router.use('/account', account);
router.use('/admin', admin);
router.use('/customer', customer);
router.use('/insta', insta_images);

export default router;
