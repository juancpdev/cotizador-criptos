import Select, { ActionMeta, SingleValue } from 'react-select';
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { useState } from 'react';
import { Pair } from '../types';
import { toast } from 'react-toastify';
import CryptoPriceDisplay from './CryptoPriceDisplay';

export default function CriptoSearchForm() {

    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })
    
    const { cryptocurrencies, fetchData } = useCryptoStore()


    // Mapeo para las opciones de criptomonedas con imágenes
    const cryptoOptions = cryptocurrencies.map(crypto => ({
        value: crypto.CoinInfo.Name,
        label: (
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <img 
                    src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`} 
                    alt={crypto.CoinInfo.FullName} 
                    style={{ width: 30, marginRight: 10 }}
                />
                {crypto.CoinInfo.FullName}
            </div>
        )
    }));

    // Opciones de monedas tradicionales
    const currencyOptions = currencies.map(currency => ({
        value: currency.code,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src={currency.img} 
                    alt={currency.code} 
                    style={{ width: 30, marginRight: 10 }}
                />
                {currency.name}
            </div>
        )
    }));

    const handleChange = (newValue: SingleValue<{value: string; label: JSX.Element;}>, actionMeta: ActionMeta<{value: string;label: JSX.Element;}>) => {
        setPair({
            ...pair,
            [actionMeta.name || '']: newValue?.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!Object.values(pair).includes('')) {
            fetchData(pair)
        } else {
            toast.error('Todos los campos son obligatorios')
        }
    }

    return (
        <form 
            className="formulario"
            onSubmit={handleSubmit}
        >
            <div className="formulario-container">
                
                {/* Selector de Monedas tradicionales */}
                <div className="currency-contendor">
                    <label htmlFor="currency">Moneda:</label>
                    <Select 
                        options={currencyOptions}
                        placeholder="-- Seleccione --"
                        name="currency"
                        id="currency"
                        onChange={handleChange}
                    />
                </div>

                {/* Selector de Criptomonedas con imágenes */}
                <div className="currency-contendor">
                    <label htmlFor="criptocurrency">Criptomoneda:</label>
                    <Select 
                        options={cryptoOptions}
                        placeholder="-- Seleccione --"
                        name="cryptocurrency"
                        id="cryptocurrency"
                        onChange={handleChange}
                    />
                </div>

                <input className="boton" type="submit" value='Cotizar' />
                
                <CryptoPriceDisplay/>
            </div>
        </form>
    );
}
