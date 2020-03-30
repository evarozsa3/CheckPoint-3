import _listService from "../Services/ListService.js";
import _store from '../store.js'
//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
  let template = ''
  let lists = _store.State.lists
  lists.forEach(list => template += list.Template)
  document.getElementById("lists").innerHTML = template
}

//Public
export default class ListController {
  constructor() {
    //NOTE: After the store loads, we can automatically call to draw the lists.
    _drawLists();
    console.log("list controller working")
  }

  //TODO: Your app will need the ability to create, and delete both lists and listItems
  create(event) {
    event.preventDefault()
    let formData = event.target
    let newList = {
      //NOTE we said formData.pizzaName because that is the name on our input in our index.html on our form and we set its value to title because our pizza class has title as its property.
      title: formData.listName.value
    }
    console.log("new list")
    _listService.create(newList)
    _drawLists()
    formData.reset()

  }

  addTask(event, listId) {
    event.preventDefault()
    let formData = event.target
    let newTaskData = {
      title: formData.taskName.value
    }
    _listService.addTask(newTaskData, listId)
    _drawLists()
  }

  delete(listId) {
    let didConfirm = confirm("Are you sure you want to delete this List?");
    console.log(listId)
    _listService.delete(listId)
    _drawLists()
  }
  deleteTask(taskId, listId) {
    let didConfirm = confirm("Are you sure you want to delete this task?");
    if (didConfirm) {
      (_listService.deleteTask(taskId, listId))
      _store.saveState()
      _drawLists()
    }
    console.log(_store.State.lists)
  }
}
