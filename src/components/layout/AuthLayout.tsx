import {Outlet} from 'react-router-dom'

export default function AuthLayout() {
    return (
        <section className="flex flex-col items-center justify-center w-full h-screen">
            <Outlet/>
        </section>
    )
}
