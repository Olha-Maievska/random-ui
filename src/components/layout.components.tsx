import { FC, PropsWithChildren } from 'react'
import { Button, Navbar } from 'flowbite-react'
import { useAuthStore } from '../modules/auth/store'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const authStore = useAuthStore()
  return (
    <div className="mx-auto px-12">
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HRBite
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {authStore.isLoggedIn && <Button>Log out</Button>}
          <Navbar.Toggle />
        </div>
        <main>{children}</main>
      </Navbar>
    </div>
  )
}

export default Layout
