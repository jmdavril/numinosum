import { createStore } from "redux";
import { booksReducer } from "./reducer";

export default createStore(booksReducer);
