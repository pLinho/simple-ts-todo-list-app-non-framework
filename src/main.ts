import { Application } from "./core/application";
import { TodoView } from "./todo-list/todo-view";

new Application()
    .loadView(new TodoView())
    .bootstrap()
    .catch((error) => {
        console.error(error);
    });