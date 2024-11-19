import { Outlet } from "react-router-dom"

const AuthLayout = () => {

  return (
    <section className="custom-gradiant h-screen overflow-auto grid place-items-center	">
      <Outlet/>
    </section>
  )
}

export default AuthLayout
