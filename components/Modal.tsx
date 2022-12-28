import { useContext, useEffect } from "react";
import { HeatMapContext } from "../context/HeatMapContext";
import useComponentVisible from "../hooks/useComponentVisible";

type ModalTypes = {
    title?: string;
    children: React.ReactNode;
    showModal:boolean;
    setShowModal:any;
    fullscreen?:boolean;
}

const Modal=(props:ModalTypes) => {

    const { children, title, showModal, setShowModal } = props    
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(
        ()=>{
            if (!isComponentVisible) {
                setShowModal(false)
                setIsComponentVisible(true)
            }
        }, [isComponentVisible]
    )



    return (
        <>
        
            {showModal ? (
                <div className="">
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-[1001] outline-none focus:outline-none"
                    >
                        <div className={"relative my-6 mx-auto " + (props.fullscreen ? "w-[80%]" :"w-fit" )} ref={ref}>
                            {/*content*/}
                            <div className="h-full w-full border-0 rounded-lg shadow-lg relative  flex flex-col bg-white outline-none focus:outline-none">
                                {/*header*/}
                                
                                <div style={{ display: title ? "" :"none"}} className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t items-center">
                                    <h3 className="text-xl font-semibold">
                                        {title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className=" relative p-6 flex-auto">
                                   {children}
                                </div>
                                {/*footer*/}
                          
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    );
}
export default Modal;