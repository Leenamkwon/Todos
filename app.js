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

function addItem(e) {
  e.preventDefault();
  const value = todoTemp.value;
  const id = new Date().getTime().toString();

  if (value.trim() && !editFlag) {
    const div = document.createElement('div');
  } else if (value.trim() && editFlag) {
  } else {
    showFeedBack('값을 입력해주세요', 'alert-danger');
  }
}

function showFeedBack() {}

// edit option이 필요한 이유?
// edit값을 맞추려고?
// editID는 상태 비교용 ?
