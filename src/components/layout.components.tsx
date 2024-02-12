import { FC, PropsWithChildren } from 'react'
import { Navbar } from 'flowbite-react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
      <main>{children}</main>
    </Navbar>
  )
}

export default Layout
