import Router from 'koa-router';
import Auth from '../../middlewares/auth';
import Answers from '../../controllers/answers/answers';
const router = new Router({ prefix: '/api/answers/popular' });

const {
  popular,
  assInfo
} = Answers;

router.get('/', new Auth().m, popular, assInfo);

export default router;