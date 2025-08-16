import { useState } from 'react'

export const useBoolean = (initialShow = false) => {
  const [ active, setActive ] = useState(initialShow)
  const open = () => setActive(true)
  const close = () => setActive(false)
  const toggle = () => setActive(!active)
  const set = (value: boolean) => setActive(value)

  return { active, setActive, open, close, toggle, set }
}
