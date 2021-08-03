export default function initBillsController(db) {
  const index = async (request, response) => {
    const { billName } = request.body;
    try {
      const bill = await db.Bill.create({
        name: billName,
      });
      // Send back the bill.id that was just created in the db
      const billId = bill.id;
      response.send({ billId });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
  };
}
