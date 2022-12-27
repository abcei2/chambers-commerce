
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Loader = () =>{
    return <div className="flex items-center justify-center">
        <div className="rounded-full h-full w-full flex gap-3  ">

            <div className="m-5 animate-ping bg-gray-400 rounded-full h-5 w-5 ">
            </div>
            <div className="m-5 animate-ping bg-gray-400  rounded-full h-5 w-5 ">
            </div>
            <div className="m-5 animate-ping bg-gray-400  rounded-full h-5 w-5 ">
            </div>
            
        </div>
    </div>
}
export default Loader