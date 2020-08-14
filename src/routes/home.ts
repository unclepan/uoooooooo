import Router from 'koa-router';
import Home from '../controllers/home';

const router = new Router({
  prefix: '/api'
});

const { index, upload } = Home;

router.get('/', index);
router.post('/upload', upload);
export default router;
