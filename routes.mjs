import { resolve } from "path";
import db from "./models/index.mjs";

import initBillsController from "./controllers/billController.mjs";
import initPeopleController from "./controllers/personController.mjs";

export default function routes(app) {
  const billsController = initBillsController(db);
  const peopleController = initPeopleController(db);

  app.post("/bill", billsController.create);
  app.put("/bill", billsController.update);

  app.get("/person", peopleController.index);
  app.post("/person", peopleController.create);
  app.put("/person", peopleController.update);

  // special JS page. Include the webpack index.html file
  app.get("/home", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });
}
