import React from 'react'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
    </div>
  )
}

export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <h3 className="text-red-900 font-medium mb-2">Error</h3>
      <p className="text-red-700 text-sm mb-3">{error?.message || String(error) || 'Something went wrong'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ icon = '📭', title = 'No items', description = '', action }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-slate-600 text-sm mb-4">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function SkeletonLoader({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-slate-200 rounded-lg h-20 animate-pulse"></div>
      ))}
    </div>
  )
}
