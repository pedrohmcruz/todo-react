import React, { useState } from 'react';

function TodoForm(props) {
  const [text, setText] = useState('');

  function handleChanges(event) {
    let t = event.target.value;
    setText(t);
  }

  function addItem(event) {
    event.preventDefault(); 
    if(text === '') {
      alert('Digite uma tarefa.');
    } else {
        props.onAddItem(text);
        setText('');
      }
  }

  return(
    <form>
      <input onChange={handleChanges} type='text' value={text} />
      <button onClick={addItem}>ADD</button>
    </form>
  )
}

export default TodoForm;