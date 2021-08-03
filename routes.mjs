import { resolve } from 'path';
import db from './models/index.mjs';
import initBillsController from './controllers/bills.mjs';

export default function routes(app) {
  const BillsController = initBillsController(db);

  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/create-bill', BillsController.index);
}
