import React from 'react';
import ItemPeople from './ItemPeople.jsx';

const ItemPeopleList = ({ itemList, peopleList, setPeopleList }) => (
  itemList.map((item, index) => (
    // Every item has a separate <ItemPeople /> component each item needs its
    // own state of who should be charged for that item
    <ItemPeople key={index} item={item} peopleList={peopleList} setPeopleList={setPeopleList} />
  ))
);

export default ItemPeopleList;
