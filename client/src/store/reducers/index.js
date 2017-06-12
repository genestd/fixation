import {combineReducers} from 'redux'
import fixation from '../reducers/fixation'


const rootReducer = combineReducers({
  fixation: fixation,
})

export default rootReducer
