import serverApp from './app';

const server = serverApp.listen(3001, () => {
  console.log('服务运行在 http://localhost:3001');
  console.log('Press CTRL-C to stop \n');
});


export default server;