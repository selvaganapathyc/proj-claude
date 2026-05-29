import Icon from '../Icon.jsx'
import { initials, avColor, dept, tenure } from '../helpers.js'

const STATUS_PILL = {
  active: { cls: 'active', label: 'Active' },
  leave: { cls: 'leave', label: 'On leave' },
  remote: { cls: 'remote', label: 'Remote' },
}

export default function EmployeeCard({ emp, onClick }) {
  const d = dept(emp.dept)
  const pill = STATUS_PILL[emp.status] || STATUS_PILL.active
  return (
    <div className="emp" onClick={onClick}>
      <div className="stat-dot">
        <span className={'pill ' + pill.cls}>{pill.label}</span>
      </div>
      <div className="row1">
        <div className="av" style={{ background: avColor(emp.id) }}>{initials(emp.name)}</div>
        <div>
          <h3>{emp.name}</h3>
          <div className="role">{emp.role}</div>
        </div>
      </div>
      <div className="meta">
        <div>
          <span className="dept-tag" style={{ color: d.color, background: d.color + '15' }}>{d.name}</span>
        </div>
        <div><Icon name="mail" /> {emp.email}</div>
        <div><Icon name="pin" /> {emp.loc} · joined {tenure(emp.start)} ago</div>
      </div>
    </div>
  )
}
