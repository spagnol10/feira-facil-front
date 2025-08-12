import type { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import DataProvider from "../context/appContext";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DataProvider>
            <ToastContainer />
            <Component {...pageProps} />
        </DataProvider>
    );
}
