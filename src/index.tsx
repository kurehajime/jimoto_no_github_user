import ReactDOM from 'react-dom/client'
import MainElement from './compornents/MainElement'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <HashRouter>
        <Routes>
            <Route path="/" element={
                <MainElement></MainElement>
            } />
            <Route path="/:pref" element={
                <MainElement></MainElement>
            } />
            <Route path="/:pref/:cursor" element={
                <MainElement></MainElement>
            } />
        </Routes>
    </HashRouter>
</div >)