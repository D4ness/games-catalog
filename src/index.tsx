import App from "./App";
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();
const container: HTMLElement = document.getElementById("root")
createRoot(container).render(
    <BrowserRouter>
        <ThemeProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </BrowserRouter>
)
