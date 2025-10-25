import { useNavigate } from 'react-router-dom'

import { Button } from '../../@common/components/Button'
import { cn } from '../../@common/utils/cn'
import useLogin from '../../modules/auth/hooks/useLogin'
import { USERS_ROUTES } from '../../modules/users/routes'

import fervorLogo from '/fj.svg'

interface ILayout {
  children: React.ReactNode
}
export const MAIN_MENU_WIDTH = '280px'
export const MAIN_MENU_HEIGHT = '72px'

export const MainLayout = ({ children }: ILayout) => (
  <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
    <MainMenu />
    <main className="flex-1 overflow-auto">{children}</main>
  </div>
)

const MainMenu = () => {
  const navigate = useNavigate()
  const { logOut } = useLogin()
  const navigateToIndex = () => navigate(USERS_ROUTES.INDEX)

  return (
    <nav
      className={cn(
        'px-6 py-4 flex w-full justify-between items-center',
        'bg-white border-b border-gray-200 shadow-sm'
      )}
      style={{ height: MAIN_MENU_HEIGHT }}
    >
      <div onClick={navigateToIndex} className="cursor-pointer flex items-center gap-3">
        <img src={fervorLogo} className="rounded-lg w-10 h-10" alt="Logo FJ" />
        <span className="font-semibold text-lg text-gray-800">TailAdmin</span>
      </div>
      <Button onClick={logOut} variant="secondary" size="sm">
        Cerrar sesión
      </Button>
    </nav>
  )
}
