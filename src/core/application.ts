import { ViewRender } from "./view-render";

export class Application {
    private catchHandler: (error: Error) => void;
    private views: ViewRender[] = [];

    private bootstrapViews() {
        this.views.map((view) => {
            document.body.append(
                view.rendered());
        });
    }

    appendView(view: ViewRender) {
        this.views.push(view);
        return this;
    }

    bootstrap() {
        try {
            this.bootstrapViews();
        } catch (error) {
            if (this.catchHandler)
                this.catchHandler(error);
        }
        return this;
    }

    catch(handler: (error: Error) => void) {
        this.catchHandler = handler;
        return this;
    }
}