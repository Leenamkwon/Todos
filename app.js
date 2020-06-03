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
    list.appendChild(element);
    // display alert
    displayAlert('할 일이 추가되었습니다.', 'success');
    // show container
    container.classList.add('show-container');
    // add to local storage
    addToLocalStorage(id, value);
    // set back to the default
    setBackToDefault();
  } else if (value.trim() && editFlag) {
  } else {
    displayAlert('값을 입력해주세요.', 'danger');
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.classList.remove(`alert-${action}`);
  }, 1300);
}

function clearItems() {
  const clear = document.querySelectorAll('.grocery-item');
  if (clear.length > 0) {
    clear.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('모두 삭제되었습니다', 'danger');
  setBackToDefault();
  // localStorage.removeItem('list');
}

function setBackToDefault() {
  todoTemp.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

function addToLocalStorage(id, value) {
  console.log('added to local storage');
}

// edit option이 필요한 이유?
// edit값을 맞추려고?
// editID는 상태 비교용 ?
