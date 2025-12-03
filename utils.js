/**
 * Utility function to create page URLs for routing
 * Converts page names to URL-safe paths
 */
export function createPageUrl(pageName) {
  if (!pageName) return '/'
  
  // Convert camelCase to kebab-case
  const kebabCase = pageName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
  
  return `/${kebabCase}`
}

/**
 * Utility to parse URL path back to page name
 */
export function parsePageFromUrl(pathname) {
  const path = pathname.replace(/^\//, '').replace(/\/$/, '')
  if (!path) return 'Dashboard'
  
  // Convert kebab-case to PascalCase
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Format currency values
 */
export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(value)
}

/**
 * Format dates consistently
 */
export function formatDate(date, format = 'short') {
  if (!date) return ''
  const d = new Date(date)
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  if (format === 'long') {
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }
  if (format === 'time') {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  
  return d.toISOString()
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate string to max length with ellipsis
 */
export function truncate(str, maxLength = 50) {
  if (!str) return ''
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}
