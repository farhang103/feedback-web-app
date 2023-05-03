import "../styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <main>
                    <Component {...pageProps} />
                </main>
            </PersistGate>
        </Provider>
    );
}

export default MyApp;
