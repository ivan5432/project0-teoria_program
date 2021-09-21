// save somewhere in array
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')



class Task {
  constructor(id, text, state = false) {
    this.id = id;
    this.text = text;
    this.state = state;
  }
  toggle() {
    this.state ? this.state = false : this.state = true;
  }
  get html() {
    if (this.state == false) {
      return `<li class=${classNames.TODO_ITEM}>
              <input type='checkbox' onchange='checkToggle(this)' id='${this.id}' class=${classNames.TODO_CHECKBOX}>
              <p class=${classNames.TODO_TEXT}>${this.text}</p>
            </li>`
    } else if (this.state == true) {
      return `<li class=${classNames.TODO_DELETE}>
                <input type='checkbox' onchange='checkToggle(this)' id='${this.id}' class=${classNames.TODO_CHECKBOX} checked>
                <p class=${classNames.TODO_TEXT}>${this.text}</p>
              </li>`
    }
  }
}


let tasks = [];
let id = 0;

function checkToggle(checkbox) {
  tasks[Number(checkbox.id)].toggle();
  redraw();
}

function redraw(prompt = null) {
  if (prompt) {
    let unchecked = 0;
    let t = new Task(id, prompt);
    id++;
    tasks.push(t)
    list.innerHTML = '';
    for (let el of tasks) {
      list.insertAdjacentHTML("beforeend", el.html);
      if (!el.state) {
        unchecked++;
      }
    }
    itemCountSpan.innerText = `${tasks.length}`
    uncheckedCountSpan.innerText = `${unchecked}`
  } else {
    let unchecked = 0;
    list.innerHTML = '';
    for (let el of tasks) {
      list.insertAdjacentHTML("beforeend", el.html);
      if (!el.state) {
        unchecked++;
      }
    }
    itemCountSpan.innerText = `${tasks.length}`
    uncheckedCountSpan.innerText = `${unchecked}`

  }
}

function newTodo() {
  let { TODO_ITEM, TODO_CHECKBOX, TODO_TEXT, TODO_DELETE } = classNames;
  let prompt = window.prompt('Enter task');
  redraw(prompt);
}
