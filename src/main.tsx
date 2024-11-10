import { createRoot } from 'react-dom/client'
import '@/assets/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routes';


createRoot(document.getElementById('root')!).render(

    <>
    <AppRouter />
    </>

)
