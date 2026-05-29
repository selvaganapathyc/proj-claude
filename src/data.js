// Static reference data + first-run seed data for Atrium.

export const TODAY = '2026-05-29'

export const DEPTS = [
  { id: 'eng', name: 'Engineering', color: '#c0492f', lead: 'Priya Raman' },
  { id: 'des', name: 'Design',      color: '#6b7755', lead: 'Maya Chen' },
  { id: 'sal', name: 'Sales',       color: '#c69214', lead: 'Diego Alvarez' },
  { id: 'ops', name: 'Operations',  color: '#3d6080', lead: 'Selva C.' },
  { id: 'mkt', name: 'Marketing',   color: '#8a5a83', lead: 'Hannah Okafor' },
]

export const LEAVE_COLORS = { Vacation: '#6b7755', Sick: '#c0492f', Parental: '#8a5a83', Personal: '#3d6080' }
export const AV_COLORS = ['#c0492f', '#6b7755', '#c69214', '#3d6080', '#8a5a83', '#9c3621', '#4a7a6f', '#a8632a']

export const SEED_EMPLOYEES = [
  { id: 1, name: 'Priya Raman',    role: 'VP of Engineering', dept: 'eng', email: 'priya@atrium.co',  phone: '+1 415 555 0142', loc: 'San Francisco', start: '2019-03-11', status: 'active', salary: 215000, type: 'Full-time' },
  { id: 2, name: 'Maya Chen',      role: 'Head of Design',    dept: 'des', email: 'maya@atrium.co',   phone: '+1 415 555 0188', loc: 'San Francisco', start: '2020-06-01', status: 'active', salary: 182000, type: 'Full-time' },
  { id: 3, name: 'Diego Alvarez',  role: 'Sales Director',    dept: 'sal', email: 'diego@atrium.co',  phone: '+1 312 555 0119', loc: 'Chicago',       start: '2018-09-23', status: 'active', salary: 168000, type: 'Full-time' },
  { id: 4, name: 'Hannah Okafor',  role: 'Marketing Lead',    dept: 'mkt', email: 'hannah@atrium.co', phone: '+44 20 7946 001', loc: 'London',        start: '2021-01-18', status: 'remote', salary: 134000, type: 'Full-time' },
  { id: 5, name: 'Theo Lindqvist', role: 'Senior Engineer',   dept: 'eng', email: 'theo@atrium.co',   phone: '+46 8 555 0177',  loc: 'Stockholm',     start: '2021-08-30', status: 'remote', salary: 148000, type: 'Full-time' },
  { id: 6, name: 'Aisha Bello',    role: 'Product Designer',  dept: 'des', email: 'aisha@atrium.co',  phone: '+1 646 555 0133', loc: 'New York',      start: '2022-02-14', status: 'active', salary: 121000, type: 'Full-time' },
  { id: 7, name: 'Marco Rossi',    role: 'Account Executive', dept: 'sal', email: 'marco@atrium.co',  phone: '+39 06 555 0150', loc: 'Rome',          start: '2022-11-07', status: 'leave',  salary: 98000,  type: 'Full-time' },
  { id: 8, name: 'Lena Vogt',      role: 'Ops Coordinator',   dept: 'ops', email: 'lena@atrium.co',   phone: '+49 30 555 0166', loc: 'Berlin',        start: '2023-04-03', status: 'active', salary: 86000,  type: 'Full-time' },
  { id: 9, name: 'Sam Whitfield',  role: 'Backend Engineer',  dept: 'eng', email: 'sam@atrium.co',    phone: '+1 415 555 0190', loc: 'San Francisco', start: '2023-07-19', status: 'active', salary: 139000, type: 'Full-time' },
  { id: 10, name: 'Noor Hadid',    role: 'Content Strategist', dept: 'mkt', email: 'noor@atrium.co',  phone: '+1 213 555 0124', loc: 'Los Angeles',   start: '2024-01-22', status: 'active', salary: 92000,  type: 'Contract' },
]

export const SEED_LEAVE = [
  { id: 1, emp: 7, type: 'Parental', from: '2026-05-01', to: '2026-08-01', days: 66, status: 'approved', note: 'Parental leave — first child.' },
  { id: 2, emp: 3, type: 'Vacation', from: '2026-06-15', to: '2026-06-26', days: 10, status: 'pending',  note: 'Family trip to Italy.' },
  { id: 3, emp: 9, type: 'Sick',     from: '2026-05-27', to: '2026-05-29', days: 3,  status: 'approved', note: 'Flu recovery.' },
  { id: 4, emp: 6, type: 'Vacation', from: '2026-07-04', to: '2026-07-11', days: 6,  status: 'pending',  note: 'Summer break.' },
  { id: 5, emp: 5, type: 'Personal', from: '2026-06-02', to: '2026-06-03', days: 2,  status: 'denied',   note: 'Overlaps with release week.' },
]
