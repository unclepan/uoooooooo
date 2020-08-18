import Router from 'koa-router';
import Auth from '../../middlewares/auth';
import Periodical from '../../controllers/periodical';
const router = new Router({ prefix: '/api/periodical'});

const {
  find,
  findById,
  create,
  update,
  checkPeriodicalExist,
  delete: del,
} = Periodical;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkPeriodicalExist, findById);

router.patch('/:id', new Auth().m, checkPeriodicalExist, update);

router.delete('/:id', new Auth().m, checkPeriodicalExist, del);

export default router;