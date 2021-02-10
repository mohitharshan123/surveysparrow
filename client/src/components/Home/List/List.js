import React from "react";
import "./List.css";
import ListItem from "./ListItem/ListItem";
function List({ items }) {

  return (
    <div>
      {items.map((item) => (
          <ListItem key={item.item_id} item={item}></ListItem>
      ))}
    </div>
  );
}

export default List;
