import Router from 'koa-router';
import Bp from '../controllers/bp';

const router = new Router({
  prefix: '/api/bp'
});

const { create, find } = Bp;

router.post('/', create);
router.get('/', find);

export default router;
