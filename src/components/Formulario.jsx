import { useEffect, useState } from 'react'


function Formulario({ cliente, onGuardar, onCancelarEdit, clientes, modoUpdate }) {
    const [nombre, setNombre] = useState(cliente?.nombre || '')
    const [apellido, setApellido] = useState(cliente?.apellido || '')
    const [rut, setRut] = useState(cliente?.rut || '')
    const [email, setEmail] = useState(cliente?.email || '')


    // EditCliente: Rellenar el form con los datos del cliente
    useEffect(() => {
        if (cliente) {
            setNombre(cliente.nombre)
            setApellido(cliente.apellido)
            setRut(cliente.rut)
            setEmail(cliente.email)
        }
    }, [cliente])

    const [error, setError] = useState({})

    const formSubmit = e => {
        e.preventDefault()

        const errores = {}

        // Validar cliente
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,15}$/.test(nombre.trim())) {
            errores.nombre = 'Nombre inválido'
        }
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,15}$/.test(apellido.trim())) {
            errores.apellido = 'Apellido inválido'
        }
        if (!/^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
            errores.email = 'Formato de correo inválido'
        }
        if (!/^\d{7,8}-[\dkK]$/.test(rut.trim())) {
            errores.rut = 'Formato de rut inválido'
        }

        // Validar que rut sea único
        if (!modoUpdate && clientes.some(c => c.rut === rut)) {
            errores.rutDuplicado = 'El RUT ya está registrado';
          }

        setError(errores)
        // Pausar y renderizar los errores si los hay
        if (Object.keys(errores).length > 0) return;

        function limpiarCliente(campos) {
            return {
                nombre: campos.nombre.trim(),
                apellido: campos.apellido.trim(),
                rut: campos.rut.trim(),
                email: campos.email.trim()
            }
        }

        const cliente = limpiarCliente({nombre, apellido, rut, email})

        // Le paso el cliente nuevo al componente padre para que lo guarde en su componente
        // y luego puedo compartirlo con el componente ListClientes
        onGuardar(cliente)
        resetForm()
        setError({})
    }

    // Limpiar el Form
    const resetForm = () => {
        setNombre('')
        setApellido('')
        setRut('')
        setEmail('')
    }

    const cancelarUpdate = () => {
        resetForm()
        onCancelarEdit()
        setError({})
    }

    return (
        <div className='col-12 col-md-6 mb-5'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className="card-title mb-4">{cliente ? 'Actualizar' : 'Agregar'} cliente</h3>
                    <form onSubmit={formSubmit} id='formulario'>
                        {/* NOMBRE */}
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" required id="nombre" />
                            {error.nombre && <div className="text-danger">{error.nombre}</div>}
                        </div>
                        {/* APELLIDO */}
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} className="form-control" required id="apellido" />
                            {error.apellido && <div className="text-danger">{error.apellido}</div>}
                        </div>
                        {/* RUT */}
                        {!cliente ? (
                            <div className="mb-3">
                                <label htmlFor="rut" className="form-label">RUT</label>
                                <input type="text" value={rut.trim()} onChange={e => setRut(e.target.value)} className="form-control" required id="rut" />
                                {error.rut && <div className="text-danger">{error.rut}</div>}
                                {error.rutDuplicado && <div className="text-danger">{error.rutDuplicado}</div>}
                            </div>
                        ) : (
                            <div className="mb-3">
                                <label htmlFor="rut" className="form-label">RUT</label>
                                <input type="text" value={rut.trim()} disabled className="form-control" id="rut" />
                            </div>
                        )}

                        {/* CORREO */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" value={email.trim()} onChange={e => setEmail(e.target.value)} className="form-control" required id="email" />
                            {error.email && <div className="text-danger">{error.email}</div>}
                            {error.emailDuplicado && <div className="text-danger">{error.emailDuplicado}</div>}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary me-3" type="submit">
                                {cliente ? 'Actualizar' : 'Guardar'}
                            </button>

                            {cliente && (
                                <button onClick={cancelarUpdate} className='btn btn-outline-danger'>Cancelar</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario