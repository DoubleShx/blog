import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from "./reducers/_rootReducer";





const store = createStore(rootReducer, applyMiddleware(thunk))
//const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

export default store;
