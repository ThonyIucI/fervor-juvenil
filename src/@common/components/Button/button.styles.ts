import type { ButtonSize, ButtonVariant } from '.'

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow',
  secondary:
    'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 border border-gray-200',
  outline:
    'border border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 bg-white text-gray-700',
  ghost: 'hover:bg-gray-100 active:bg-gray-200 text-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow'
}

export const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl'
}

export const buttonBase =
  'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
