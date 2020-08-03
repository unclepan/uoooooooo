import Router from 'koa-router';
import Auth from '../middlewares/auth';
import Feedback from '../controllers/feedback';
const router = new Router({ prefix: '/api/feedback'});
const {
  find,
  create,
  checkFeedbackExist,
  delete: del,
} = Feedback;

router.get('/', find);

router.post('/', new Auth().m, create);

router.delete('/:id', new Auth().m, checkFeedbackExist, del);

export default router;