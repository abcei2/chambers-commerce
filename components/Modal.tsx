import { useContext } from "react";
import { HeatMapContext } from "../context/HeatMapContext";

type ModalTypes = {
    title: string;
    children: React.ReactNode;
    showModal:boolean;
    setShowModal:any;
}

const Modal=(props:ModalTypes) => {

    const { children, title, showModal, setShowModal } = props    
    const { filterDiv } = useContext(HeatMapContext)

    return (
        <>
        
            {showModal ? (
                <div className="">
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-[1001] outline-none focus:outline-none"
                    >
                        <div className="relative w-fit my-6 mx-auto " ref={filterDiv}>
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative  flex flex-col bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        {title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
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