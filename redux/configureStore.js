import { createStore,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Favorites } from './favorites';
import { persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/es/storage';



export const ConfigureStore = () => {

    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }
    const store = createStore(
        // combineReducers({
        //     dishes: Dishes,
        //     comments: Comments,
        //     promotions: Promotions,
        //     leaders: Leaders,
        //     favorites: Favorites
        // }),
        persistCombineReducers( config, {
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            favorites: Favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)
    return {store, persistor};
}
