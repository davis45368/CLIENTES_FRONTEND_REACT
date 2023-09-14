import { useEffect, useState } from "react";
import { set, useForm } from 'react-hook-form';
import { createCliente, updateCliente, getCliente, deleteCliente, listTipoDocumento } from "../Api/Clientes.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
import './form.css'



export function ClienteFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try{
      await updateCliente(params.id, data);
      navigate('/clientes')
      toast.success('Cliente Actualizado')
      } catch (error) {
        console.error(error)
        toast.error('Error al Actulizar')
      }
    } else {
      try {
        await createCliente(data);
        navigate('/clientes')
        toast.success('Cliente Creado')
      } catch (error) {
        console.error(error)
        toast.error('Error al Crear')
      }
    }
  });

  useEffect(() => {
    async function loadCliente() {
      if (params.id) {
        const { data } = await getCliente(params.id);
        setValue('nombre_completo', data.nombre_completo);
        setValue('numero_documento', data.numero_documento);
        setValue('tipo_documento', data.tipo_documento);
        setValue('email', data.email);
        setValue('fecha_nacimiento', data.fecha_nacimiento,);
        setTipoDocumentoValue(data.tipo_documento);
      }
    };
    loadCliente();
  }, [])

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tipoDocumentoValue, setTipoDocumentoValue] = useState('');
  useEffect(() => {
    async function ListarTipoDocumento() {
      const resList = await listTipoDocumento();
      setTiposDocumento(resList.data);
      if (params.id) {
        const { data } = await getCliente(params.id);
        setTipoDocumentoValue(data.tipo_documento);
      }
    }
    ListarTipoDocumento();
  }, []);


  return (
    <main className="container-sm mb-12">
      <div className="row py-3">
        <div className="col-md-10 offset-md-1">
          {params.id ? <h2 className="text-center display-3 py-3">Actulizar Cliente</h2> : <h2 className="text-center display-3 py-3">Crear CLiente</h2>}
          <form onSubmit={onSubmit} className="row g-3 needs-validation form mb-2">
            
            <div className="py-2 col-md-7">
              <label htmlFor="nombre_completo">Nombre Completo:</label>
              <input type="text" placeholder="Ingrese el nombre completo" className="form-control mt-1 mayus" {...register("nombre_completo", { required:true })}/>
            </div>
            {
            <div className="py-2 col-md-4">
              <label htmlFor="tipo_documento">Tipo Documento:</label>
              <select name="tipo_documento" className="form-select input-group mt-1" {...register('tipo_documento')} defaultValue={tipoDocumentoValue}>
                <option value="0">Selecionar</option>
                {tiposDocumento.map((option) => (
                  <option value={option[0]} key={option[0]}>{option[1]}</option>
                ))}
              </select>
            </div>
                }
            <div className="py-2 col-md-4">
              <label htmlFor="numero_documento">Numero Documento:</label>
              <input type="text" placeholder="Ingrese el documento" className="form-control mt-1" {...register("numero_documento", { required:true })}/>
            </div>
            <div className="py-2 col-md-5">
              <label htmlFor="email">Email:</label>
              <input type="email" placeholder="Ingresal el correo" className="form-control mt-1" {...register("email")}/>
            </div>
            <div className="py-2 col-md-3">
              <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
              <input type="date" name="fecha_nacimiento" className="form-control mt-1" {...register("fecha_nacimiento")} defaultValue={""}/>
            </div>
            <hr />
            <div className="d-flex justify-content-end botones">
              <Link to={'/clientes'}>
              <button className="btn btn-outline-info mx-1" >
                Cancelar
              </button>
              </Link>
              { params.id && 
              <button className="btn btn-outline-danger mx-1" type="button"
              onClick={async () =>{
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar',
                    showCancelButton: true,
                }).then(async(result) => {
                    if (result.isConfirmed) {
                        await deleteCliente(params.id);
                        Swal.fire(
                            '¡Eliminado!',
                            '',
                            'success'
                        )
                        navigate('/clientes')
                    }
                })
            } }>
                Eliminar
              </button>
              }
              <button type="submit" className="btn btn-outline-success mx-1">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

  )
}
