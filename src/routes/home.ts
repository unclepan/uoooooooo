import Router from 'koa-router';
import Home from '../controllers/home';

const router = new Router({
  prefix: '/api'
});

const { index, upload, bpCreate, bpFind } = Home;

router.get('/', index);
router.post('/upload', upload);
router.post('/bp', bpCreate);
router.get('/bp', bpFind);

export default router;
