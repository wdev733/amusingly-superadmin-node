import { Router } from 'express';
import { getProduct } from './controller';

const router = new Router();

router.get(
  '/',
  getProduct
);

export default router;
