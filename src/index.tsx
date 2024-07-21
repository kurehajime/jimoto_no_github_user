import ReactDOM from 'react-dom/client'
import MainElement from './compornents/MainElement'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <QueryClientProvider client={queryClient}>
        <HashRouter>
            <Routes>
                <Route path="/" element={
                    <MainElement></MainElement>
                } />
                <Route path="/:sort/:pref" element={
                    <MainElement></MainElement>
                } />
                <Route path="/:sort/:pref/:cursor" element={
                    <MainElement></MainElement>
                } />
            </Routes>
        </HashRouter>
    </QueryClientProvider>
</div >)