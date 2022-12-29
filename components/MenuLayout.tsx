import { useRouter } from "next/router"
import { ReactNode, useState } from "react"

const MenuLayout = (props:{
    children:ReactNode
}) => {
    const [showNames, setShowNames] = useState(false)
    const router = useRouter()
    return <div className="">
        <div className="w-full bg-[var(--header-color)] " >
            <button>
                <img src="/logo.png" className="h-[120px]" onClick={() => router.push("/")} />
            </button>
        </div>
        <div className="py-5 md:pl-2">
            <div className="flex flex-col bg-[var(--secondary-color)] absolute rounded-[20px]   justify-center   z-10 " 
                onMouseLeave={() => setShowNames(false)}>
                <div className="layout-menu-item rounded-t-[20px]"  onMouseEnter={() => setShowNames(true)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> 
                    {showNames?"Menú":""}
                </div>
                <div className="border-b-2 border-gray-300" />
                <div className="layout-menu-item" onClick={()=> router.push("/")}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    {showNames ? "Gráficos" : ""}                    
                </div>
                <div className="layout-menu-item" onClick={() => router.push({pathname:"/map",query:{
                    locationId:-1
                }})}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                    {showNames ? "Mapa de calor" : ""}
                </div>  
                <div className="layout-menu-item rounded-b-[20px]" onClick={() => router.push("/info")}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    {showNames ? "Información" : ""}
                </div>
            </div>
            <div className={router.pathname.includes("map")?"":"ml-5"}>

                {props.children}
            </div>
        </div>
    </div>
}
export default MenuLayout