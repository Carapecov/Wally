import { buildServer } from './app/server';

const port = Number(process.env.PORT ?? 3000);
const server = buildServer();
server.listen(port, () => console.log(`Wally API ouvindo na porta ${port}`));
