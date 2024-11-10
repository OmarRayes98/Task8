import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <h1>
      AuthLayout
      <Outlet/>
    </h1>
  )
}

export default AuthLayout
