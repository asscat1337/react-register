import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    REGISTER,
    PERSIST,
} from 'redux-persist'
import dashboard from './slices/dashboardSlice'
import user from './slices/userSlice'
import error from './slices/errorSlice'
import {PURGE} from "redux-persist/es/constants";

const persistConfig = {
    key:'root',
    storage
}

const rootReducer = combineReducers({
    dashboard,
    user,
    error
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
    store,
    persistor
}
