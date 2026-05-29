import { useEffect, useState, useCallback } from 'react'
import { SEED_EMPLOYEES, SEED_LEAVE } from './data.js'
import { daysBetween } from './helpers.js'

const KEY = 'atrium.v1'

function loadInitial() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* ignore corrupt storage */
  }
  return { employees: SEED_EMPLOYEES, leave: SEED_LEAVE, nextEmp: 11, nextLeave: 6 }
}

// Central app store: persists to localStorage on every change and exposes actions.
export function useStore() {
  const [data, setData] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data))
  }, [data])

  const addEmployee = useCallback((emp) => {
    setData((d) => ({ ...d, employees: [...d.employees, { id: d.nextEmp, ...emp }], nextEmp: d.nextEmp + 1 }))
  }, [])

  const updateEmployee = useCallback((id, patch) => {
    setData((d) => ({ ...d, employees: d.employees.map((e) => (e.id === id ? { ...e, ...patch } : e)) }))
  }, [])

  const removeEmployee = useCallback((id) => {
    setData((d) => ({
      ...d,
      employees: d.employees.filter((e) => e.id !== id),
      leave: d.leave.filter((l) => l.emp !== id),
    }))
  }, [])

  const addLeave = useCallback((req) => {
    setData((d) => ({
      ...d,
      leave: [...d.leave, { id: d.nextLeave, days: daysBetween(req.from, req.to), status: 'pending', ...req }],
      nextLeave: d.nextLeave + 1,
    }))
  }, [])

  const setLeaveStatus = useCallback((id, status) => {
    setData((d) => ({ ...d, leave: d.leave.map((l) => (l.id === id ? { ...l, status } : l)) }))
  }, [])

  const removeLeave = useCallback((id) => {
    setData((d) => ({ ...d, leave: d.leave.filter((l) => l.id !== id) }))
  }, [])

  return {
    employees: data.employees,
    leave: data.leave,
    addEmployee,
    updateEmployee,
    removeEmployee,
    addLeave,
    setLeaveStatus,
    removeLeave,
  }
}
