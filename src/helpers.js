import { DEPTS, AV_COLORS, TODAY } from './data.js'

export const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
export const avColor = (id) => AV_COLORS[(id * 7) % AV_COLORS.length]
export const dept = (id) => DEPTS.find((d) => d.id === id) || { name: '—', color: '#999' }
export const fmtMoney = (n) => '$' + n.toLocaleString()
export const fmtDate = (s) =>
  new Date(s + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function tenure(start) {
  const d = new Date(start + 'T00:00:00')
  const now = new Date(TODAY)
  const months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  const y = Math.floor(months / 12)
  const m = months % 12
  return (y ? y + 'y ' : '') + m + 'mo'
}

// Average tenure in years (1 decimal) for a set of employees.
export function avgTenureYears(team) {
  if (!team.length) return 0
  const now = new Date(TODAY)
  const total = team.reduce((a, e) => {
    const d = new Date(e.start + 'T00:00:00')
    return a + (now - d) / (1000 * 60 * 60 * 24 * 365)
  }, 0)
  return Math.round((total / team.length) * 10) / 10
}

export function daysBetween(from, to) {
  return Math.round((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1
}
