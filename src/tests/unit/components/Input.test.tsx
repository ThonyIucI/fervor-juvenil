import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from '@common/components/Input'
import { render, screen } from '@tests/utils/test-utils'

describe('Input Component', () => {
  it('should render input field', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument()
  })

  it('should render with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('should show required asterisk when required', () => {
    render(<Input label="Name" required />)
    const label = screen.getByText('Name')
    expect(label.parentElement?.textContent).toContain('*')
  })

  it('should display error message', () => {
    render(<Input label="Email" error="Email is required" />)
    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i)
  })

  it('should display helper text', () => {
    render(<Input label="Password" helperText="Must be at least 8 characters" />)
    expect(screen.getByText(/must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('should not show helper text when error is present', () => {
    render(<Input label="Email" error="Invalid email" helperText="Enter your email" />)
    expect(screen.queryByText(/enter your email/i)).not.toBeInTheDocument()
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
  })

  it('should handle user input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input placeholder="Type here" onChange={handleChange} />)

    const input = screen.getByPlaceholderText(/type here/i)
    await user.type(input, 'Hello')

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Hello')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input label="Disabled Input" disabled />)
    const input = screen.getByLabelText(/disabled input/i)
    expect(input).toBeDisabled()
  })

  it('should apply different sizes', () => {
    const { rerender } = render(<Input inputSize="sm" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('px-3', 'py-1.5')

    rerender(<Input inputSize="md" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('px-4', 'py-2')

    rerender(<Input inputSize="lg" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('px-5', 'py-3')
  })

  it('should render with left icon', () => {
    const LeftIcon = () => <span data-testid="left-icon">🔍</span>

    render(<Input leftIcon={<LeftIcon />} placeholder="Search" />)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('should render with right icon', () => {
    const RightIcon = () => <span data-testid="right-icon">👁</span>

    render(<Input rightIcon={<RightIcon />} placeholder="Password" />)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('should apply error styles when error is present', () => {
    render(<Input error="Error message" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-red-500')
  })

  it('should apply fullWidth by default', () => {
    const { container } = render(<Input data-testid="input-field" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('w-full')
  })

  it('should work with react-hook-form register', () => {
    const mockRegister = {
      name: 'email',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn()
    }

    render(<Input register={mockRegister} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('name', 'email')
  })

  it('should merge custom className', () => {
    render(<Input className="custom-input" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('custom-input')
    expect(input).toHaveClass('rounded-lg') // default class
  })
})
