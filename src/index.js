import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('GET_IMAGES',getImages);
  yield takeEvery('GET_TAGS',getTags);
}

//collecting all images from database
function* getImages() {
    try {
        let imagesResponse = yield axios.get('/api/images')
        console.log(imagesResponse);
        yield put({ type: 'SET_IMAGES', payload: imagesResponse.data })
    } catch (error) {
        console.log(error)
    }
}

//collecting all tags from database
function* getTags(){
    try {
        let tagResponse = yield axios.get('/api/tags')
        console.log(tagResponse);
        yield put({ type: 'SET_TAGS', payload: tagResponse.data })
    } catch (error) {
        console.log(error)
    }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store images returned from the server
const images = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.)
const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        images,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
