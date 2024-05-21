import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./app/store.js"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
)
