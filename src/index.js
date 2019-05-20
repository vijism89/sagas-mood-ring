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
    console.log('rootSaga called');
  yield takeEvery('GET_IMAGES',getImages);
  yield takeEvery('GET_TAGS',getTags);
  yield takeEvery('GET_IMAGETAGS',getImageTags);
  yield takeEvery('POST_TAGS',postTags);
  yield takeEvery('DELETE_TAGS',deleteTags);
}

//collecting all images from database
function* getImages() {
    console.log('getImageCalled');
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
    console.log('getTagsCalled');
    try {
        let tagResponse = yield axios.get('/api/tags')
        console.log(tagResponse);
        yield put({ type: 'SET_TAGS', payload: tagResponse.data })
    } catch (error) {
        console.log(error)
    }
}
function* getImageTags(action) {
    console.log(action.payload);
    try {
        let imageTag = yield axios.get(`/api/imagetags/${action.payload}`);
        yield put({ type: 'SET_IMAGETAGS', payload: imageTag.data})
    } catch (error) {
        console.log(error)
    }
}
function* postTags(action){
    try {
        // let imageTagObject = {
        //     ...this.props.reduxState.feedbackReducer
        // }
        yield axios.post('/api/imagetags',action.payload)
       const imageTagsResponse = yield axios.get(`/api/imagetags/${action.payload.images_id}`)
        yield put({type:'SET_IMAGETAGS', payload:imageTagsResponse.data})
    }catch (error) {
        console.log(error)
    }
}
//delete tags
function* deleteTags(action){
    try {
        // let imageTagObject = {
        //     ...this.props.reduxState.feedbackReducer
        // }
        yield axios.delete('/api/imagetags',action.payload)
       const deleteResponse = yield axios.get(`/api/imagetags/${action.payload.tags_id}`)
        yield put({type:'SET_IMAGETAGS', payload:deleteResponse.data})
    }catch (error) {
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

const imageTags = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGETAGS':
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
        imageTags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
