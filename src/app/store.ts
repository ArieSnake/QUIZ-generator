import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { taskApi } from "../features/tests_template/test.api"
import { testSlice } from "../features/tests_template/Dashboard/task.slice"

const rootReducer = combineReducers({
  [taskApi.reducerPath]: taskApi.reducer,
  task:testSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
   
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(taskApi.middleware)
    },
    preloadedState,
  })
 
  setupListeners(store.dispatch)
  return store
}
export const store = makeStore()
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>