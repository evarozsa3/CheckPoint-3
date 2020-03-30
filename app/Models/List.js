import { generateId } from "../utils.js";
import Task from "./Task.js";
export default class List {
  constructor(data) {
    //TODO Your constructor takes in a data object that should have the properties you need to create your list here is a freebie, it will set the id its provided, or if that is undefined it will create a new one (this is an alternative to object destructuring)
    this.title = data.title

    this.id = data.id || generateId()
    /** @type {Task[]} */
    this.tasks = data.tasks || []
  }
  get Tasks() {
    let template = ""
    this.tasks.forEach(task => {
      task = new Task(task)
      template += task.TaskTemplate(this.id)
    })
    return template
  }

  get Template() {
    //Be sure to add the methods needed to create the view template for this model
    //For starting out, your tasks may be strings alone, but later you may wish to turn them into full objects, that will be up to you
    return /*html*/`
     <div class="col-3 ml-5 mr-5 mb-5  border border-warning rounded shadow bg-dark">
        <button type="button" class="close text-danger" onclick="app.listController.delete('${this.id}')">
          <span>&times;</span>
        </button>
        <h1>${this.title}</h1>
        <form onsubmit="app.listController.addTask(event, '${this.id}')">
          <div class="form-group">
         
            <input type="text" name="taskName" class="form-control card-form" placeholder="Add a Task.." required
              aria-describedby="helpId">
          </div>
        </form>

        <h5>Tasks:</h5>
        <dl>
          ${this.Tasks}
        </dl>
      </div>
    `
  }
}
