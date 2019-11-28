import { Router } from 'express';

import account from './v_admin/account';
import admin from './v_admin/admin';
import customer from './v_admin/customer';
import instaImages from './v_admin/insta_images';

import clientAccount from './v_client/account';
import clientInstagram from './v_client/instagram';
import clientWidget from './v_client/widget';

const router = new Router();

router.use('/account', account);
router.use('/admin', admin);
router.use('/customer', customer);
router.use('/insta', instaImages);

router.use('/client', clientAccount);
router.use('/instagram', clientInstagram);
router.use('/widget', clientWidget);

export default router;
