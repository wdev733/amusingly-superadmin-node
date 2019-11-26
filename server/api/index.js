import { Router } from 'express';

import account from './v_admin/account';
import admin from './v_admin/admin';
import customer from './v_admin/customer';
import insta_images from './v_admin/insta_images';

const router = new Router();

router.use('/account', account);
router.use('/admin', admin);
router.use('/customer', customer);
router.use('/insta', insta_images);

export default router;
