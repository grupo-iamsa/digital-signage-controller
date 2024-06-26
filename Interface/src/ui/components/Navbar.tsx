import { FC, ReactElement, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../auth/context/AuthContext"

interface Props {
  children: ReactElement
}


export const Navbar:FC<Props> = ({ children }) =>{
  const redirect = useNavigate()
  const { logout } = useContext( AuthContext )

  const handlerLogout = () =>{
    logout()
    
    redirect("/login")
  }

  return(
    <nav className="w-[15%] flex flex-col h-screen justify-between ">
      <section className="flex flex-col ">
        <div className="flex justify-center items-center gap-2 mt-4 after:content-['V2.2.0'] after:absolute after:top-10 after:left-36 after:text-red-600
        after:font-bold after:text-[12px]">
          <img className="w-1/6" src="/img/grupo_iamsa_logo.jpg" alt="Logo de app" />
          <h1 className=" font-semibold text-sm">Señalizacion Digital</h1>

        </div>
        { children }
      </section>



      <button 
        onClick={handlerLogout}
        className="w-4/5 text-center py-2 mb-6 bg-gray-200 self-center hover:bg-red-600 hover:text-white cursor-pointer">
        Logout
      </button>

    </nav>
  )
}