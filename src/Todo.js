import React, { useEffect, useState } from 'react';
import List from './components/List';
import './Todo.css'
import TodoForm from './components/TodoForm'
import Item from './components/Item';
import Modal from './components/Modal';
const SAVED_ITEMS = "savedItems";

function Todo() {

  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState(() => {
    const save = localStorage.getItem(SAVED_ITEMS);
    const initialValue = JSON.parse(save);
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
  }, [items])

  useEffect(() => {
    let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));   
    if(savedItems) {
      setItems(savedItems);
    }
  }, [])

  function onAddItem(text) {
    let it = new Item(text);
    setItems([...items, it]);
    onHideModal();
  }

  function onItemDeleted(item) {
    let filteredItems = items.filter(it => it.id !== item.id);
    setItems(filteredItems);
  }

  function onDone(item) {
    let updatedItems = items.map(it => {
      if(it.id === item.id) {
        it.done = !it.done;
      }

      return it;
    })

    setItems(updatedItems);
  }

  function onHideModal() {
    setShowModal(false);
  }

  function onEdit(item, editedText) {
    const updatedItems = items.map((it) => {
      if (it.id === item.id) {
        it.text = editedText;
      }
      return it;
    });
    setItems(updatedItems);
  }

  return(
    <div className='container'>
      
      <header className='header'>
        <h1>Todo</h1>
        <button onClick={() => {setShowModal(true)}} className='addButton'>+</button>
      </header>

      <List onDone={onDone} onItemDeleted={onItemDeleted} items={items} onEdit={onEdit} />
      
      <Modal show={showModal} onHideModal={onHideModal}>
        <TodoForm onAddItem={onAddItem} />
      </Modal>


    </div>
  )
}
export default Todo;