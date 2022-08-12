import { resolve } from 'path';
import db from './models/index.mjs';
import initBillsController from './controllers/bills.mjs';
import initPeopleController from './controllers/people.mjs';

export default function routes(app) {
  const BillsController = initBillsController(db);
  const PeopleController = initPeopleController(db);

  app.post('/bill', BillsController.create);
  app.post('/person', PeopleController.addPerson);
  app.post('/mealCost', PeopleController.mealCost);

  // Root route renders Webpack-generated main.html file
  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
