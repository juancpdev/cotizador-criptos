import { useMemo } from "react";
import { useCryptoStore } from "../store"
import Spinner from "./Spinner";


export default function CryptoPriceDisplay() {
    
    const { result, loading } = useCryptoStore()
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])


    return (
        <div className="result-contenedor">
            {loading ? <Spinner/> : hasResult && (
                <>

                    <div className="result">
                        <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen Crypto" />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio más alto del día: <span>{result.HIGH24HOUR}</span></p>
                            <p>Precio más bajo del día: <span>{result.LOW24HOUR}</span></p>
                            <p>Valoración últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
