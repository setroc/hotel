import { Navbar } from "../navbar"

export const Layout = ({children}) => {
  return (
    <div className="container-fluid p-0 ">
      <div className="row m-0 flex-column">
        <Navbar />
        {children}
      </div>
    </div>
  )
}