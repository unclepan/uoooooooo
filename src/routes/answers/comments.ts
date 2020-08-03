import Router from 'koa-router';
import Auth from '../../middlewares/auth';
import Comments from '../../controllers/answers/comments';
const router = new Router({ prefix: '/api/questions/:questionId/answers/:answerId/comments' });

const {
  find,
  findById,
  create,
  update,
  checkCommentExist,
  checkCommentator,
  delete: del
} = Comments;

router.get('/', find);

router.post('/', new Auth().m, create);

router.get('/:id', checkCommentExist, findById);

router.patch('/:id', new Auth().m, checkCommentExist, checkCommentator, update);

router.delete('/:id', new Auth().m, checkCommentExist, checkCommentator, del);


export default router;