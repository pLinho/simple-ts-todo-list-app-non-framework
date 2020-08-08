import { Application } from "./application";
import { TodoView } from "./todo-list/todo-view";

new Application()
    .appendView(new TodoView())
    .bootstrap()
    .catch((error) => {
        console.error(error);
    });