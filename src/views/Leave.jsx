import Icon from '../Icon.jsx'
import { LEAVE_COLORS } from '../data.js'
import { initials, avColor, dept, fmtDate } from '../helpers.js'

const ORDER = { pending: 0, approved: 1, denied: 2 }

export default function Leave({ employees, leave, onNew, onSetStatus, onRemove }) {
  const rows = [...leave].sort((a, b) => ORDER[a.status] - ORDER[b.status] || a.from.localeCompare(b.from))

  return (
    <div className="view">
      <div className="topbar">
        <div>
          <div className="eyebrow">Time Off</div>
          <h2 className="serif">Leave requests</h2>
          <p>Review and manage vacation, sick, parental and personal leave across the team.</p>
        </div>
        <button className="btn" onClick={onNew}><Icon name="plus" /> New request</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const e = employees.find((x) => x.id === l.emp) || { name: '—', id: 0, dept: null }
              const c = LEAVE_COLORS[l.type] || '#999'
              return (
                <tr key={l.id}>
                  <td>
                    <div className="td-person">
                      <div className="av" style={{ background: avColor(e.id) }}>{initials(e.name)}</div>
                      <div><b>{e.name}</b><span>{dept(e.dept).name}</span></div>
                    </div>
                  </td>
                  <td><span className="lt"><span className="d" style={{ background: c }} />{l.type}</span></td>
                  <td>{fmtDate(l.from)} – {fmtDate(l.to)}</td>
                  <td><b>{l.days}</b></td>
                  <td><span className={'status ' + l.status}>{l.status}</span></td>
                  <td>
                    <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                      {l.status !== 'approved' && (
                        <button className="iconbtn ok" title="Approve" onClick={() => onSetStatus(l.id, 'approved')}><Icon name="check" /></button>
                      )}
                      {l.status !== 'denied' && (
                        <button className="iconbtn no" title="Deny" onClick={() => onSetStatus(l.id, 'denied')}><Icon name="x" /></button>
                      )}
                      <button className="iconbtn" title="Delete" onClick={() => onRemove(l.id)}><Icon name="trash" /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
