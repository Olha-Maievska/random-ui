import { FC, PropsWithChildren } from 'react'
import { Navbar } from 'flowbite-react'
import { useAuthStore } from '../modules/auth/store'
import HrButton from './hr-button.components'
import { observer } from 'mobx-react'

const Layout: FC<PropsWithChildren> = observer(({ children }) => {
  const authStore = useAuthStore()

  const handleLogoutClick = () => {
    authStore.logout()
  }
  return (
    <div className="mx-auto px-12">
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HRBite
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {authStore.isLoggedIn && (
            <HrButton
              onClick={handleLogoutClick}
              isLoading={authStore.logoutStatus === 'LOADING'}
            >
              Log out
            </HrButton>
          )}
          <Navbar.Toggle />
        </div>
      </Navbar>
      <main>{children}</main>
    </div>
  )
})

export default Layout
