import Router from 'koa-router';
import Auth from '../middlewares/auth';
import Questions from '../controllers/questions';
const router = new Router({ prefix: '/api/questions' });

const {
  find,
  findById,
  create,
  update,
  checkQuestionExist,
  checkQuestioner,
  delete: del,
  informationStatistics
} = Questions;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkQuestionExist, findById);

router.patch('/:id', new Auth().m, checkQuestionExist, checkQuestioner, update);

router.delete('/:id', new Auth().m, checkQuestionExist, checkQuestioner, del);

router.get('/:id/information/statistics', new Auth().m, checkQuestionExist, informationStatistics);

export default router;