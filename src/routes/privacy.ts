import Router from 'koa-router';
import Auth from '../middlewares/auth';
import Privacy from '../controllers/privacy';

const router = new Router({ prefix: '/api/privacy'});
const {
  find,
  findById,
  create,
  update,
  checkPrivacyExist,
  delete: del,
} = Privacy;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkPrivacyExist, findById);

router.patch('/:id', new Auth().m, checkPrivacyExist, update);

router.delete('/:id', new Auth().m, checkPrivacyExist, del);

export default router;