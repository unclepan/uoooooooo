import Router from 'koa-router';
import Auth from '../middlewares/auth';
import Advertisement from '../controllers/advertisement';

const router = new Router({ prefix: '/api/advertisement'});
const {
  find,
  findById,
  create,
  update,
  checkAdvertisementExist,
  delete: del,
} = Advertisement;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkAdvertisementExist, findById);

router.patch('/:id', new Auth().m, checkAdvertisementExist, update);

router.delete('/:id', new Auth().m, checkAdvertisementExist, del);

export default router;