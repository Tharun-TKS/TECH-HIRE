import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';

import PostsReducer from './reducers/PostsReducer';
import authReducer from './reducers/AuthReducer';
import todoReducers from './reducers/Reducers';
//import { reducer as reduxFormReducer } from 'redux-form';
const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Persist Config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // only auth will be persisted, add other reducers if needed
};

// Combine Reducers
const rootReducer = combineReducers({
    posts: PostsReducer,
    auth: authReducer,
    todo: todoReducers,
});
// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
const store = createStore(
    persistedReducer,
    composeEnhancers(middleware)
);

// Persistor
const persistor = persistStore(store);

export { store, persistor };
