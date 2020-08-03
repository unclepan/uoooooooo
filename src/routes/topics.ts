import Router from 'koa-router';
import Topics from '../controllers/topics';
import Auth from '../middlewares/auth';
const router = new Router({ prefix: '/api/topics' });

const {
  find,
  findById,
  create,
  update,
  listTopicFollowers,
  checkTopicExist,
  listQuestions,
  listPeriodicals,
  informationStatistics
} = Topics;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkTopicExist, findById);

router.patch('/:id', new Auth().m, checkTopicExist, update);

router.get('/:id/followers', checkTopicExist, listTopicFollowers);

router.get('/:id/questions', checkTopicExist, listQuestions);

router.get('/:id/periodicals', checkTopicExist, listPeriodicals);

router.get('/:id/information/statistics', new Auth().m, checkTopicExist, informationStatistics);

export default router;