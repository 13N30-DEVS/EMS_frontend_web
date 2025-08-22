import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import Button from './Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Button {...defaultProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button {...defaultProps} onClick={mockOnClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state correctly', () => {
    render(<Button {...defaultProps} disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    const customClass = 'custom-button-class';
    render(<Button {...defaultProps} className={customClass} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });

  it('applies custom id', () => {
    const customId = 'custom-button-id';
    render(<Button {...defaultProps} id={customId} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', customId);
  });

  it('applies type attribute', () => {
    render(<Button {...defaultProps} type='submit' />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<Button {...defaultProps} style={customStyle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: red');
  });

  it('applies aria-label', () => {
    const ariaLabel = 'Accessible button label';
    render(<Button {...defaultProps} aria-label={ariaLabel} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', ariaLabel);
  });
});
