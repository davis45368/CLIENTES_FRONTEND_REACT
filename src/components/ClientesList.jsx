import { useEffect, useState } from "react";
import { ClienteCard } from "./ClienteCard";

export function ClientesList() {
    const [clientes, setCLientes] = useState([])
    const [search, setSearch] = useState("")
    const URL = 'https://api-clientes-django.onrender.com/clientes/api/v1/cliente/'
    
    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCLientes(data)
    }
    
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    //Filtro por nombre y numero de documento
    const resultsNombre = !search ? clientes : clientes.filter((dato)=> dato.nombre_completo.toLowerCase().includes(search.toLocaleLowerCase()))
    const resultsDocumento = !search ? clientes : clientes.filter((dato)=> dato.numero_documento.toLowerCase().includes(search.toLocaleLowerCase()))
    //Se agregan a una sola varible para validar si tienen datos
    const results = [resultsDocumento, resultsNombre] 

    useEffect( ()=> {
        showData();
      }, [])
      

    return(
        <main className="container-sm mb-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1 className="text-center display-3 py-5">Listado de Clientes</h1>
                    <form className="d-flex my-4" role="search">
                        <input type="text" value={search} onChange={searcher} className="form-control me-2" placeholder="Buscar | Nombre o Documento" aria-label="Search" />
                    </form>
                    <ul className="list-group mb-2">
        	            {results[0].length > 0 || results[1].length > 0 ?(
                            results[0].length > 0 ? (
                                resultsDocumento.map((cliente) => (
                                    <ClienteCard key={cliente.id} cliente={cliente} />
                                ))
                            ) : (
                                resultsNombre.map((cliente) => (
                                    <ClienteCard key={cliente.id} cliente={cliente} />
                                ))
                            )
                        )
                        
                        : (<p className="text-center py-2">No hay resultados :(</p>)}
                    </ul>
                </div>
            </div>
        </main>
    )}