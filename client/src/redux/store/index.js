import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import reducer from '../reducer/index'
import thunk from 'redux-thunk'

const store = configureStore(
  { reducer },
  applyMiddleware(thunk)
)

export default store
