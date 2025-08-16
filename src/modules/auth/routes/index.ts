export const AUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    RESTORE_PASSWORD: '/restore-password',
    FORGOT_PASSWORD: '/forgot-password',
    pathToRestorePassword: (email: string) => `/restore-password?email=${email}`
}
