import { useState } from 'react'
import Icon from '../Icon.jsx'
import EmployeeCard from '../components/EmployeeCard.jsx'
import { DEPTS } from '../data.js'

export default function Employees({ employees, onAdd, onOpenEmployee }) {
  const [q, setQ] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')

  const list = employees.filter((e) => {
    const okQ = !q || (e.name + e.role + e.email + e.loc).toLowerCase().includes(q.toLowerCase())
    const okD = deptFilter === 'all' || e.dept === deptFilter
    return okQ && okD
  })

  return (
    <div className="view">
      <div className="topbar">
        <div>
          <div className="eyebrow">Directory</div>
          <h2 className="serif">People</h2>
          <p>Everyone at Atrium, in one place. Click anyone to view their full profile.</p>
        </div>
        <button className="btn" onClick={onAdd}><Icon name="plus" /> Add person</button>
      </div>

      <div className="toolbar">
        <div className="search">
          <Icon name="search" />
          <input placeholder="Search by name, role, location…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="chips">
          <button className={'chip' + (deptFilter === 'all' ? ' on' : '')} onClick={() => setDeptFilter('all')}>All</button>
          {DEPTS.map((d) => (
            <button key={d.id} className={'chip' + (deptFilter === d.id ? ' on' : '')} onClick={() => setDeptFilter(d.id)}>{d.name}</button>
          ))}
        </div>
      </div>

      {list.length ? (
        <div className="grid">
          {list.map((e) => <EmployeeCard key={e.id} emp={e} onClick={() => onOpenEmployee(e)} />)}
        </div>
      ) : (
        <div className="empty"><Icon name="users" /><p>No one matches that search.</p></div>
      )}
    </div>
  )
}
