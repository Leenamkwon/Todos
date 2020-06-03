// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const todoTemp = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// delete btn

function addItem(e) {
  e.preventDefault();
  const value = todoTemp.value;
  const id = new Date().getTime().toString();

  if (value.trim() && !editFlag) {
    const article = document.createElement('article');
    // add class
    article.classList.add('grocery-item');
    // add id
    article.setAttribute('data-id', id);
    article.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn" data-id="${id}">
            <i class="fas fa-edit"></i>
          </button>

          <button type="button" class="delete-btn" data-id="${id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;
    // append child
    list.appendChild(article);

    const deleteBtn = document.querySelectorAll('.delete-btn');
    const editBtn = document.querySelector('.edit-btn');
    deleteBtn.forEach((item) => {
      item.addEventListener('click', deleteItem);
    });
    editBtn.forEach((item) => {
      item.addEventListener('click', editItem);
    });
    // display alert
    displayAlert('할 일이 추가되었습니다.', 'success');
    // show container
    container.classList.add('show-container');
    // add to local storage
    addToLocalStorage(id, value);
    // set back to the default
    setBackToDefault();
  } else if (value.trim() && editFlag) {
    editElement.innerHTML = value;
    displayAlert('값이 변경되었습니다.', 'success');
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert('값을 입력해주세요.', 'danger');
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.classList.remove(`alert-${action}`);
    alert.textContent = '';
  }, 1300);
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = e.currentTarget.dataset.id;

  list.removeChild(element);
  if (list.children.length === 0) {
    clearBtnDelete();
  }
  displayAlert('지정된 할 일이 삭제되었습니다.', 'danger');
  setBackToDefault();

  // remove from localStorage
  removeFromLocalStorage(id);
}

function editItem(e) {
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = e.currentTarget.dataset.id;
  submitBtn.textContent = 'edit';
}

function clearItems() {
  const clear = document.querySelectorAll('.grocery-item');
  if (clear.length > 0) {
    clear.forEach((item) => {
      list.removeChild(item);
    });
  }
  clearBtnDelete();
  displayAlert('모두 삭제되었습니다', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}

function setBackToDefault() {
  todoTemp.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

function addToLocalStorage(id, value) {
  const grocery = { id, value };
  const todo = !localStorage.getItem('list')
    ? []
    : JSON.parse(localStorage.getItem('list'));

  local.push(grocery);
  localStorage.setItem('list', JSON.stringify(todo));
}

function removeFromLocalStorage(id) {
  const todo = JSON.parse(localStorage.getItem('list'));

  const updateTodo = todo.filter((item) => {
    return item.id !== id;
  });

  localStorage.setItem('list', JSON.parse(updateTodo));
}

function editLocalStorage(id, value) {
  const todo = JSON.parse(localStorage.getItem('list'));
  const items = { id, value };
  todo.push(items);

  localStorage.setItem('list', JSON.stringify(todo));
}

function getLocalStorage() {}

function initialLoaded() {}

function clearBtnDelete() {
  container.classList.remove('show-container');
}

window.addEventListener('DOMContentLoaded', () => {});

// edit option이 필요한 이유?
// edit값을 맞추려고?
// editID는 상태 비교용 ?
