import Router from 'koa-router';
import Auth from '../../middlewares/auth';
import Answers from '../../controllers/answers';
const router = new Router({ prefix: '/api/questions/:questionId/answers' });

const {
  find,
  findById,
  create,
  update,
  checkAnswerExist,
  checkAnswerer,
  delete: del,
  info,
  assInfo,
} = Answers;

router.get('/', find);

router.get('/detailed/info', new Auth().m, info, assInfo);

router.post('/', new Auth().m, create);

router.get('/:id', checkAnswerExist, findById);

router.patch('/:id', new Auth().m, checkAnswerExist, checkAnswerer, update);

router.delete('/:id', new Auth().m, checkAnswerExist, checkAnswerer, del);

export default router;