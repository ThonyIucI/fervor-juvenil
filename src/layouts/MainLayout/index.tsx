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
  <>
    <MainMenu />
    <main>{children}</main>
  </>
)

const MainMenu = () => {
  const navigate = useNavigate()
  const { logOut } = useLogin()
  const navigateToIndex = () => navigate(USERS_ROUTES.INDEX)

  return (
    <nav className={cn('p-3 px-4 flex w-full justify-between',
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
    )}
    style={{ height: MAIN_MENU_HEIGHT }}>
      <div onClick={navigateToIndex}>
        <img src={fervorLogo} className="rounded cursor-pointer w-10" alt="Logo FJ" height={10} />
      </div>
      <Button onClick={logOut}>
                Cerrar sesión
      </Button>
    </nav>
  )
}
