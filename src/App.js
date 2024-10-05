import 'swiper/swiper.min.css';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AppRoutes from './config/Routes'


function App() {
  return (
    <BrowserRouter>
        <>
        <Header/>
        <AppRoutes/>
        <Footer/>
        </>
    </BrowserRouter>
    
  );
}

export default App;
