import Router from 'koa-router';
import Auth from '../middlewares/auth';
import Carousel from '../controllers/carousel';

const router = new Router({ prefix: '/api/carousel'});
const {
  find,
  findById,
  create,
  update,
  checkCarouselExist,
  delete: del,
} = Carousel;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkCarouselExist, findById);

router.patch('/:id', new Auth().m, checkCarouselExist, update);

router.delete('/:id', new Auth().m, checkCarouselExist, del);

export default router;