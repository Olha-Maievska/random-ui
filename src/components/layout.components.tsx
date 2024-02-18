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
    <div className="mx-auto md:px-12 mt-2">
      <Navbar className="bg-neutral-200">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
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
        </div>
      </Navbar>

      <main>{children}</main>
    </div>
  )
})

export default Layout
