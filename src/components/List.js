import React from 'react';
import ListItem from './ListItem';

function List(props) {
  return(
    <ul> 
        {props.items.map((item) => 
          <ListItem key={item.id} item={item} editItems={props.editItems} onDone={props.onDone} onItemDeleted={props.onItemDeleted} onEdit={props.onEdit} />
        )}
    </ul>
  )
}

export default List;