import React from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      className
    )}
    {...props}
  >
    {children}
  </button>
))

Button.displayName = 'Button'

export { Button }
