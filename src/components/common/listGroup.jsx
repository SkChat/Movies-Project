import React from "react";
const ListGroup = (props) => {
  const { items, valueProperty, textProperty, selectedItem } = props; //items->array of objects
  return (
    <ul className="list-group">
      {items.map((
        item //item->each array in items
      ) => (
        <li
          key={item[valueProperty]} //in item array the unique thing is the _id
          //instead of writting {item._id} we r writing like this so that if in backend instead of _id
          //the property is of other name,we can still manage it
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => props.onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
