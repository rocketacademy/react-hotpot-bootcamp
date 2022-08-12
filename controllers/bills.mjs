export default function initBillsController(db) {
  // create bill
  const create = async (req, res) => {
    try {
      console.log(req.body);
      const newBill = await db.Bill.create({
        name: req.body.name,
      });
      console.log('bill created', newBill);
      res.cookie('billId', newBill.id);
      res.send({ newBill });
    }
    catch (error) {
      console.log(error);
    }
  };

  return ({ create });
}
