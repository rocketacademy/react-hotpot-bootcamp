import React, { useState } from "react";
import axios from "axios";

function Item({ name, price, people, updatePeople }) {
  console.log("------- receiving in ITEM component ------");
  console.log(`nbame: ${name}`);
  console.log(`price: ${price}`);
  console.log(`people: ${people}`);
  const [payee, setPayee] = useState([]);
  // const [peopleDropDown, setPeopleDropDown] = useState(people);
  const [currentPerson, setCurrentPerson] = useState();

  // console.log(`banana: ${peopleDropDown}`);
  const personList = people.map((person) => {
    console.log("banana");
    return (
      <option key={person} value={person}>
        {person}
      </option>
    );
  });

  const deletePerson = (event) => {
    const removePerson = event.target.name;
    console.log(`We are going to remove ${removePerson}`);
    console.log(payee);
    // Previously i directly spliced payee. that led to very inconsistent changes effected. For when changed to tmpPayeeList, it worked very well
    const tmpPayeeList = [...payee];
    for (let i = 0; i < tmpPayeeList.length; i += 1) {
      if (tmpPayeeList[i] === removePerson) {
        tmpPayeeList.splice(i, 1);
      }
    }

    setPayee(tmpPayeeList);
    console.log(payee);
    // setPeopleDropDown([...peopleDropDown, removePerson]);
  };

  const payeeList = payee.map((person) => {
    console.log(`the payee is ${person}`);
    return (
      <div className="my-2">
        <button
          type="button"
          className="btn-close btn-sm"
          name={person}
          onClick={deletePerson}
        />
        <div className="d-inline-flex">{person}</div>
      </div>
    );
  });

  const handlePersonChange = (event) => {
    const current = event.target.value;
    console.log(`current person: ${current}`);
    setCurrentPerson(current);
  };

  // const updateDropDown = (personToRemove) => {
  //   for (let i = 0; i < peopleDropDown.length; i += 1) {
  //     if (peopleDropDown[i] === personToRemove) {
  //       peopleDropDown.splice(i, 1);
  //     }
  //   }
  //   setPeopleDropDown(peopleDropDown);
  // };

  const addPayee = () => {
    console.log("hello");
    setPayee([...payee, currentPerson]);
    // updateDropDown(currentPerson);
    const unitCost = Number(price) / payee.length;
    console.log(`The unit cost is ${unitCost}`);
    updatePeople(currentPerson, unitCost);
  };

  return (
    <div className="row mb-2">
      <h3>{name}</h3>
      <h5>${price}</h5>
      <div className="col-7">
        <select
          className="form-select"
          name="people"
          id=""
          onChange={handlePersonChange}
        >
          <option disabled selected hidden>
            Select A Person
          </option>
          {personList}
        </select>
      </div>
      <div className="col-5">
        <button className="btn btn-primary" onClick={addPayee}>
          Include payee
        </button>
      </div>
      <div className="col-12 pl-4">{payeeList}</div>
    </div>
  );
}

export default function ItemList({ items, people, updatePeople }) {
  console.log(`items: ${items}`);
  console.log(`people: ${people}`);
  const jsxItems = items.map((item) => {
    console.log(`for ${item.item}, $${item.price}`);
    return (
      <Item
        name={item.item}
        price={item.price}
        people={people}
        updatePeople={updatePeople}
      />
    );
  });

  return (
    <div className="row">
      <h1 className="my-2">Items List</h1>
      <div id="items-lists">{jsxItems}</div>
    </div>
  );
}
