import serverApp from './app';

const server = serverApp.listen(3001, () => {
  console.log('Server is running at http://localhost:3001');
  console.log('Press CTRL-C to stop \n');
});


export default server;