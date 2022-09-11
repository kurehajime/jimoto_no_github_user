import ReactDOM from 'react-dom/client'
import MainElement from './compornents/MainElement'
import './index.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <MainElement></MainElement>
</div>)