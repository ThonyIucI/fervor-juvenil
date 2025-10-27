import { useCallback, useState } from 'react'

/**
 * Hook to copy text to clipboard
 * @returns [copiedText, copy]
 *
 * @example
 * const [copiedText, copy] = useCopyToClipboard()
 *
 * <button onClick={() => copy('Text to copy')}>Copy</button>
 * {copiedText && <span>Copied: {copiedText}</span>}
 */
export function useCopyToClipboard(): [string | null, (text: string) => Promise<void>] {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')

      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedText(null)
      }, 2000)
    } catch (error) {
      console.warn('Failed to copy:', error)
      setCopiedText(null)
    }
  }, [])

  return [copiedText, copy]
}
