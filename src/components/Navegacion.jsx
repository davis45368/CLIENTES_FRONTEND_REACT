import {Link} from 'react-router-dom';

export function Navegation() {
    return(
        <nav className='navbar navbar-expand-lg bg-dark navbar-dark mt-3'>
            <div>
                <a className="navbar-brand" href="/">Clientes App</a>
            </div>
            <div className='collapse navbar-collapse d-flex  justify-content-end' id="navbarNav">
                <ul className='navbar-nav'>
                    <Link to='/ciente/add/'>
                    <button className='btn btn-secondary mx-2'>
                        <i className="fa-sharp fa-solid fa-plus fa-bounce mx-1"></i>
                        Crear Cliente
                    </button>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}