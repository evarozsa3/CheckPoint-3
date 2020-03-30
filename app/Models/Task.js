import { generateId } from "../utils.js"

export default class Task {
  constructor(data) {
    this.title = data.title
    this.taskId = data.taskId || generateId()
  }

  TaskTemplate(listId) {
    return /*html*/`
      <dd>
      <button type="button" class="close text-danger" onclick="app.listController.deleteTask('${listId}','${this.taskId}')">
      <span>&times;</span>
      </button>
      <h5>${this.title}</h5>
      </dd>
    `

  }
}