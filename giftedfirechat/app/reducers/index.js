import { combineReducers } from 'redux'
import firebase from './firebase'
import location from './location'

const reducers = combineReducers({
  firebase,
  location
})

export default reducers