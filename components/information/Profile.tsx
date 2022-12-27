const Profile = (props: { info: any }) => {
    const { info } = props
    return <div className="bg-white w-full p-5 rounded-xl flex flex-col gap-2 text-xs overflow-hidden ">
        <div className="text-sm font-semibold">
            Entidad
        </div>
        <div className="text-sm text-center my-5">
            {info.organization}
        </div>

        <div className="flex gap-4  items-center ">
            <div>
                <svg className="text-[var(--primary-color)] w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            </div>

            <div>
                <a className="underline text-blue-500" href={info.webPage}>Página web</a>
            </div>
        </div>
        <div className="flex gap-4 font-semibold items-center">
            <div>
                <svg className="text-[var(--primary-color)] w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>

            <div>{info.phone}</div>
        </div>
        <div className="flex gap-4 font-semibold items-center">
            <div>
                <svg className="text-[var(--primary-color)] w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>

            <div>{info.address}</div>
        </div>
    </div>
}
export default Profile