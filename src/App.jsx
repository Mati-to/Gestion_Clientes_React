import Header from './components/Header'
import Formulario from './components/Formulario'
import ListaClientes from './components/ListaClientes'
import DetalleCliente from './components/DetalleCliente'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'


function App() {

    const [clientes, setClientes] = useState([])
    const [findCliente, setFindCliente] = useState(null)
    const [vistaCliente, setVistaCliente] = useState(false)
    const [editarCliente, setEditarCliente] = useState(null)

    useEffect(() => {
        const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || []
        setClientes(clientesGuardados)
    }, [])

    const agregarCliente = nuevoCliente => {
        const clientesNuevos = [...clientes, nuevoCliente]
        setClientes(clientesNuevos)

        localStorage.setItem('clientes', JSON.stringify(clientesNuevos))
        toast.success('Cliente guardado!', {position: 'top-left'})
    }

    const updateCliente = clienteActualizado => {
        const clientesNuevos = clientes.map(cliente => {
            return cliente.rut === clienteActualizado.rut ? clienteActualizado : cliente
        })

        setClientes(clientesNuevos)
        localStorage.setItem('clientes', JSON.stringify(clientesNuevos))
        setEditarCliente(null)
        //? setVistaCliente(true)
        setFindCliente(clienteActualizado)
        toast.success('Cliente actualizado!', {position: 'top-left'})
    }

    const buscarCliente = rut => {
        const clienteEncontrado = clientes.find(cliente => cliente.rut === rut)
        setFindCliente(clienteEncontrado || false)
        setVistaCliente(true)
    }

    const deleteCliente = rut => {
        const clientesNuevos = clientes.filter(cliente => cliente.rut !== rut)
        setClientes(clientesNuevos)
        localStorage.setItem('clientes', JSON.stringify(clientesNuevos))
        toast.info('Cliente eliminado', {position: 'top-left'})
    }

    return (
        <div className='d-flex bg-dark flex-column min-vh-100'>
            <Header onFindCliente={buscarCliente} />

            <div className='container my-5 flex-grow-1'>
                <div className='row g-4'>
                    <Formulario
                        cliente={editarCliente}
                        clientes={clientes}
                        modoUpdate={!!editarCliente}
                        onGuardar={editarCliente ? updateCliente : agregarCliente}
                        onCancelarEdit={() => {
                            setEditarCliente(null)
                            setVistaCliente(false)
                        }}
                    />

                    {vistaCliente ? (
                        <>
                            <DetalleCliente
                                cliente={findCliente}
                                onVolverVista={() => setVistaCliente(false)}
                                onEditarCliente={() => setEditarCliente(findCliente)}
                            />
                        </>
                    ) : (
                        <ListaClientes
                            clientes={clientes}
                            onDeleteCliente={deleteCliente}
                        />
                    )}
                </div>
            </div>
            <ToastContainer closeOnClick />
        </div>
    )
}

export default App
