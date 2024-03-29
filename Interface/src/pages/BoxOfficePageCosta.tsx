import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa";
import { getInfoDb } from "../helpers/getInfoDB"
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { AddBoxOffice } from "../users/admin/components";
import { deleteRowsDB } from "../helpers/deleteRowsDB";
import { Alerts } from "../ui/components/Alerts";
import { EditBoxOffice } from "../ui/components/EditBoxOffice";
import { BoxOfficeCampaigns } from "../ui";

interface BoxOffice {
  id: string,
  nombre: string,
  dispositivo: string,
  proyeccion: string,
  estatus: string
}


export const BoxOfficePageCosta = () =>{

  const [allBoxOffice, setAllBoxOffice] = useState<BoxOffice[]>([])
  const [modal, setModal] = useState<React.ReactNode | null>(null);

  const currentPath = useLocation()

  const getBoxOffice = async () =>{
    const queryData =  await getInfoDb('taquillas', 'COSTA')
    setAllBoxOffice(queryData)

  }

  const deleteBoxOffice = async (name: string) =>{
    const res = await deleteRowsDB("taquilla", "COSTA", name)

    setModal(
      <Alerts type="success">
        <>
          {res.data}
        </>
      </Alerts>
    )

    getBoxOffice()
    setTimeout(() =>{
      setModal(null)
    },1000)
  }


  useEffect(() =>{

    getBoxOffice()

  }, [])


  

  return(
    <section className="w-full  h-full flex flex-col items-center overflow-y-auto my-8">
      { modal }
      <section className="w-[90%] flex justify-between mb-4">
        <div className="text-xl">
          <span className="text-red-600 font-semibold">No. Taquillas:</span> { allBoxOffice.length }
        </div>
        <img className="h-12" src="/img/brands/logo-costa-azul.webp" alt="Costa Logo" />
        {
          currentPath.pathname.includes('admin') 
          ? <button 
          onClick={() => setModal(<AddBoxOffice modal={ setModal } reloadInfo={ getBoxOffice } company="COSTA"/>)}
            className="py-1 px-4 bg-green-600 text-white hover:scale-105 active:scale-90 transition-all"
          >
            Nueva Taquilla +
          </button> : null
        }
      </section>
      <section className="w-[90%] pt-4 bg-white mt-2 border-b-[1px] border-gray-200">
        <header className="text-center grid grid-cols-5 font-semibold border-b-[1px] border-gray-200 pb-1">
          <article>Taquilla ▾</article>
          <article>Dispositivo ▾</article>
          <article>Proyeccion por▾</article>
          <article>Estatus ▾</article>
          <article>Acciones</article>
        </header>
        {
          allBoxOffice.map( office =>(
            <div key={office.id} className="text-center grid grid-cols-5 border-b-[1px] border-gray-200 py-2">
              <div className=" text-left pl-4">{ office.nombre }</div>
              <div>{ office.dispositivo }</div>
              <div>{ office.proyeccion }</div>
              <div><span className={office.estatus  != 'dañada' ?  office.estatus : 'dañada'}>{ office.estatus }</span></div>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setModal(<BoxOfficeCampaigns boxOffice={office.nombre} modal={setModal} company="COSTA" />)} className="hover:scale-110 active:scale-90 transition-all hover:after:content-['Campañas'] 
                after:absolute after:bg-gray-900 after:px-2 after:text-white after:top-[-20px] after:left-0">
                  <GrFormView className="text-4xl text-blue-500"/>
                </button>
                {
                  //comprovamos si estamos en la ruta del Administrador para mostrar el boton de borrado
                  currentPath.pathname.includes('admin') 
                  ? <button onClick={() => setModal(<EditBoxOffice modal={setModal} reloadInfo={ getBoxOffice } data={office} company="COSTA"/>)} 
                  className="hover:scale-110 active:scale-90 transition-all hover:after:content-['Editar'] 
                  after:absolute after:bg-gray-900 after:px-2 after:text-white after:top-[-20px] after:left-0">
                    <FaRegEdit className="text-2xl text-orange-400"/>
                  </button>
                  : ""
                }
                {
                  //comprovamos si estamos en la ruta del Administrador para mostrar el boton de borrado
                  currentPath.pathname.includes('admin') 
                  ? <button onClick={() => deleteBoxOffice(office.nombre)} className="hover:scale-110 active:scale-90 transition-all hover:after:content-['Eliminar'] 
                  after:absolute after:bg-gray-900 after:px-2 after:text-white after:top-[-20px] after:left-0">
                      <MdOutlineDeleteForever className="text-3xl text-red-600" />
                    </button>
                  : ""
                }
              </div>
            </div>
          ))
        }
      </section>
    </section>
  )
}