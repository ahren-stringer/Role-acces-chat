import authReduser from "./authReduser";
import { reducer as formReducer } from 'redux-form'

const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers= combineReducers({
    auth: authReduser,
    form: formReducer,
});

let store=createStore(redusers);

export default store