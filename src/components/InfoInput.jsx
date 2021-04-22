import React, { useState } from "react";
import axios from "axios";

export default function InfoInput({ addItemToTop, addPersonToTop }) {
  const [item, setItem] = useState();
  const [price, setPrice] = useState();
  const [person, setPerson] = useState();
  let errorMsg;

  const handleItemChange = (event) => {
    const itemField = event.target.value;
    setItem(itemField);
  };

  const handlePriceChange = (event) => {
    const priceField = event.target.value;
    setPrice(priceField);
  };

  const handlePersonChange = (event) => {
    const personField = event.target.value;
    setPerson(personField);
  };

  const addItem = () => {
    if (item && !isNaN(price)) {
      console.log("preparing to send to top!");
      setPrice(Math.round(price * 100) / 100);
      console.log(`Item: ${item}`);
      console.log(`Price: ${price}`);
      addItemToTop(item, price);
      setItem("");
      setPrice("");
    } else {
      errorMsg = "you might've forgotten somthing";
      console.log(errorMsg);
    }
  };

  const addPerson = () => {
    addPersonToTop(person);
    setPerson("");
    console.log(`about to post ${person}`);
  };

  return (
    <div className="row">
      <h1 className="text-center my-4">Add Items / People</h1>
      {/* ITEM INPUT */}
      <div className="col-5">
        <input
          className="form-control"
          type="text"
          value={item}
          onChange={handleItemChange}
          placeholder="Item Name"
        />
      </div>
      {/* PRICE INPUT */}
      <div className="col-4">
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={handlePriceChange}
          placeholder="0.00"
        />
      </div>

      <div className="col-3">
        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* PERSON INPUT */}
      <div className="col-9 mt-3">
        <input
          className="form-control"
          type="text"
          value={person}
          onChange={handlePersonChange}
          placeholder="Person name"
        />
      </div>

      <div className="col-3 mt-3">
        <button className="btn btn-primary" onClick={addPerson}>
          Add Person
        </button>
      </div>
      <hr className="my-4"></hr>
    </div>
  );
}
