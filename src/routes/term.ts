import Router from 'koa-router';
import Auth from '../middlewares/auth';
import Term from '../controllers/term';

const router = new Router({ prefix: '/api/term'});
const {
  find,
  findById,
  create,
  update,
  checkTermExist,
  delete: del,
} = Term;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkTermExist, findById);

router.patch('/:id', new Auth().m, checkTermExist, update);

router.delete('/:id', new Auth().m, checkTermExist, del);

export default router;