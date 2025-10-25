import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@common/components/Button'
import { render, screen } from '@tests/utils/test-utils'

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should apply primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-indigo-600')
  })

  it('should apply different variants correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-2')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('hover:bg-gray-100')
  })

  it('should apply different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3')
  })

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should show loading spinner when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>)

    // Check for spinner (Loader2 icon)
    const button = screen.getByRole('button')
    expect(button.querySelector('svg')).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('should render with left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>

    render(<Button leftIcon={<LeftIcon />}>With Left Icon</Button>)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('should render with right icon', () => {
    const RightIcon = () => <span data-testid="right-icon">→</span>

    render(<Button rightIcon={<RightIcon />}>With Right Icon</Button>)

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('should apply fullWidth class when fullWidth is true', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('should merge custom className with default classes', () => {
    render(<Button className="custom-class">Custom Class</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('rounded-lg') // default class
  })
})
