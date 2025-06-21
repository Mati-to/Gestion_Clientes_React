import { useState } from 'react'


function Header({ onFindCliente }) {

    const [rut, setRut] = useState('')
    const [error, setError] = useState('')

    const formBusqueda = e => {
        e.preventDefault()

        let error = ''

        if (!/^\d{7,8}-[\dkK]$/.test(rut.trim())) {
            error = 'Formato de rut inválido'
        }

        setError(error)
        if (error.length > 0) return;

        setError('')
        onFindCliente(rut)
    }


    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid justify-content-end">
                {error && <div className="text-danger me-3">{error}</div>}

                <form onSubmit={formBusqueda} className="d-flex" role="search">
                    <input className="form-control me-3" value={rut} onChange={e => setRut(e.target.value)} name='search' id='search' type="search" placeholder="12345678-9" aria-label="Search" />
                    <button className="btn btn-outline-primary" type="submit">Buscar</button>
                </form>
            </div>
        </nav>
    )
}

export default Header