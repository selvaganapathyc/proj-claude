import Icon from '../Icon.jsx'
import { initials, avColor, dept, fmtMoney, fmtDate, tenure } from '../helpers.js'

// Read-only profile drawer for one employee, with an Edit shortcut.
export default function EmployeeDetail({ emp, leave, onClose, onEdit }) {
  const d = dept(emp.dept)
  const mine = leave.filter((l) => l.emp === emp.id)
  const rows = [
    ['Email', emp.email],
    ['Phone', emp.phone],
    ['Location', emp.loc],
    ['Employment', emp.type],
    ['Start date', `${fmtDate(emp.start)} (${tenure(emp.start)})`],
    ['Compensation', `${fmtMoney(emp.salary)}/yr`],
    ['Status', <span style={{ textTransform: 'capitalize' }}>{emp.status}</span>],
    ['Leave history', `${mine.length} request${mine.length !== 1 ? 's' : ''}`],
  ]
  return (
    <>
      <div className="modal-head">
        <div className="det-head">
          <div className="av" style={{ background: avColor(emp.id) }}>{initials(emp.name)}</div>
          <div>
            <h3>{emp.name}</h3>
            <p>{emp.role} · {d.name}</p>
          </div>
        </div>
        <button className="x" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="modal-body">
        <div className="drawer-list">
          {rows.map(([label, value]) => (
            <div className="li" key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn ghost" onClick={onClose}>Close</button>
        <button className="btn" onClick={() => onEdit(emp)}><Icon name="edit" /> Edit profile</button>
      </div>
    </>
  )
}
