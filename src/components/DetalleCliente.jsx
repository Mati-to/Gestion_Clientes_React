

function DetalleCliente({ cliente, onVolverVista, onEditarCliente }) {

    return (
        <div className="col-12 col-md-6">
            <div className="card bg-light shadow-sm">
                <div className="card-body">
                    <h4 className="card-title">Detalle del Cliente</h4>
                    {!cliente ? (
                        <>
                            <p>No existe el cliente</p>
                            <div className='d-flex justify-content-end'>
                                <button onClick={onVolverVista} className='btn btn-primary'>Ver Clientes</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <ul className='lista-clientes'>
                                <li>Nombre: {cliente.nombre} {cliente.apellido}</li>
                                <li>RUT: {cliente.rut}</li>
                                <li>Email: {cliente.email}</li>
                            </ul>
                            <div className='d-flex justify-content-end'>
                                <button onClick={onVolverVista} className='btn btn-primary me-3'>Ver Clientes</button>
                                <button onClick={onEditarCliente} className='btn btn-warning'>Editar Cliente</button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default DetalleCliente