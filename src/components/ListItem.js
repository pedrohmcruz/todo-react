import React, { useState } from 'react';
import Card from './Card';

function DoneImg(props) {
  if (!props.editing) {
    if (props.done) {
      return (
        <img className='doneImage' alt='Done' src='./assets/done.png'></img>
      )
    } else {
      return (
        <img className='undoneImage' alt='undone' src='./assets/not-done.png'></img>
      )
    }
  }
}

function ListItem(props) {

  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.item.text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    props.onEdit(props.item, editedText);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedText(props.item.text);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <li>
      <Card className={props.item.done ? 'done item' : 'item'}>
        {editing ? (
          <textarea className='editInput' type="text" value={editedText} onChange={handleTextChange} />
        ) : (
          <span id='text' data-value={props.item.text}>{props.item.text}</span>
        )}

        <div className='buttonsCard'>
          {editing ? (
            <>
              <div className='editButtons'>
                <button className='buttonDelete' onClick={() => { props.onItemDeleted(props.item) }}>
                  <img className='deleteImage' alt='Excluir' src='./assets/delete.png' />
                </button>

                <button className='buttonSave' onClick={handleSave}>
                  <img className='saveImage' alt='Salvar' src='./assets/concluido.png' />
                </button>
                <button className='buttonCancel' onClick={handleCancel}>
                  <img className='cancelImage' alt='Cancelar' src='./assets/cancelar.png' />
                </button>
              </div>
            </>
          ) : (
            <>
              <button className='buttonDone' onClick={() => { props.onDone(props.item) }}>
                {!editing && <DoneImg done={props.item.done} editing={editing} />}
              </button>

              <button className='buttonDelete' onClick={() => { props.onItemDeleted(props.item) }}>
                <img className='deleteImage' alt='Excluir' src='./assets/delete.png' />
              </button>

              <button className='buttonEdit' onClick={handleEdit}>
                <img className='editImage' alt='Editar' src='./assets/editar.png' />
              </button>
            </>
          )}
        </div>
      </Card>
    </li>
  );
}

export default ListItem;
