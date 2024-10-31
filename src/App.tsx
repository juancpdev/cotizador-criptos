import { useEffect } from "react";
import CriptoSearchForm from "./components/CriptoSearchForm";
import { useCryptoStore } from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { fetchCryptos } = useCryptoStore()

  useEffect(() => {
    fetchCryptos()
  }, [fetchCryptos])

  return (
    <div className="contenedor-main">
      <ToastContainer/>
    
      <div className="container">
        <div className="texto-info">
          <h1 className="app-title">
            Cotizador de <span>Criptomonedas</span>
          </h1>
          <p>Cotizas al valor del dia</p>
          <p>Recibes información  en tiempo real</p>
          <p>Ultimas actualizaciónes</p>
        </div>
        
        <div className="content">
          <CriptoSearchForm />
        </div>
      </div>

      <footer className="footer">
        Created by
        <a className=" footer_a" target="_blank" href="https://github.com/juancpdev"> @Jpdev</a>
      </footer>
    </div>
  )
}

export default App
