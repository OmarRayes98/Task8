import { createRoot } from 'react-dom/client'
import '@/assets/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routes';
import { Provider } from 'react-redux';
import store from './store';


createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
    <AppRouter />
    </Provider>

)
