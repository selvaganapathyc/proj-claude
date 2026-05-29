import Icon from '../Icon.jsx'
import EmployeeCard from '../components/EmployeeCard.jsx'
import { DEPTS, TODAY } from '../data.js'
import { initials, avColor, fmtMoney, fmtDate } from '../helpers.js'

export default function Dashboard({ employees, leave, onAdd, onOpenEmployee }) {
  const active = employees.filter((e) => e.status !== 'leave').length
  const onLeave = employees.filter((e) => e.status === 'leave').length
  const remote = employees.filter((e) => e.status === 'remote').length
  const pending = leave.filter((l) => l.status === 'pending').length
  const avgSal = employees.length ? Math.round(employees.reduce((a, e) => a + e.salary, 0) / employees.length) : 0

  const recent = [...employees].sort((a, b) => b.start.localeCompare(a.start)).slice(0, 4)
  const upcoming = leave
    .filter((l) => l.status !== 'denied' && l.to >= TODAY)
    .sort((a, b) => a.from.localeCompare(b.from))
    .slice(0, 4)
  const maxd = Math.max(...DEPTS.map((d) => employees.filter((e) => e.dept === d.id).length), 1)

  const dateLabel = new Date(TODAY).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="view">
      <div className="topbar">
        <div>
          <div className="eyebrow">{dateLabel}</div>
          <h2 className="serif">Good morning, Selva</h2>
          <p>Here's how your people are doing across {DEPTS.length} departments and {employees.length} team members today.</p>
        </div>
        <button className="btn" onClick={onAdd}><Icon name="plus" /> Add person</button>
      </div>

      <div className="stats">
        <div className="stat" style={{ '--accent': 'var(--clay)' }}>
          <div className="lbl">Headcount</div>
          <div className="num serif">{employees.length}</div>
          <div className="sub"><b>{active}</b> active · {onLeave} on leave</div>
        </div>
        <div className="stat" style={{ '--accent': 'var(--gold)' }}>
          <div className="lbl">Pending requests</div>
          <div className="num serif">{pending}</div>
          <div className="sub">{pending ? <b className="warn">Needs your review</b> : 'All caught up'}</div>
        </div>
        <div className="stat" style={{ '--accent': 'var(--sage)' }}>
          <div className="lbl">Avg. compensation</div>
          <div className="num serif">{(avgSal / 1000).toFixed(0)}k</div>
          <div className="sub">{fmtMoney(avgSal)} per year</div>
        </div>
        <div className="stat" style={{ '--accent': '#3d6080' }}>
          <div className="lbl">Remote</div>
          <div className="num serif">{remote}</div>
          <div className="sub">{employees.length ? Math.round((remote / employees.length) * 100) : 0}% of the team</div>
        </div>
      </div>

      <div className="dash-cols">
        <div>
          <h3 className="serif" style={{ fontSize: 20, marginBottom: 14 }}>Headcount by department</h3>
          <div className="panel" style={{ padding: 22 }}>
            {DEPTS.map((d) => {
              const c = employees.filter((e) => e.dept === d.id).length
              return (
                <div key={d.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{d.name}</span>
                    <span style={{ color: 'var(--ink-faint)' }}>{c}</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--paper-2)', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(c / maxd) * 100}%`, background: d.color, borderRadius: 20, transition: 'width .6s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h3 className="serif" style={{ fontSize: 20, marginBottom: 14 }}>Upcoming time off</h3>
          <div className="panel">
            {upcoming.length ? (
              upcoming.map((l) => {
                const e = employees.find((x) => x.id === l.emp) || { name: '—', id: 0 }
                return (
                  <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px', borderBottom: '1px solid var(--line-soft)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: avColor(e.id), color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>{initials(e.name)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ fontSize: 13.5, display: 'block' }}>{e.name}</b>
                      <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{l.type} · {fmtDate(l.from)}</span>
                    </div>
                    <span className={'status ' + l.status}>{l.status}</span>
                  </div>
                )
              })
            ) : (
              <div className="empty" style={{ padding: 40 }}><p>No upcoming leave</p></div>
            )}
          </div>
        </div>
      </div>

      <h3 className="serif" style={{ fontSize: 20, margin: '30px 0 14px' }}>Newest team members</h3>
      <div className="grid">
        {recent.map((e) => <EmployeeCard key={e.id} emp={e} onClick={() => onOpenEmployee(e)} />)}
      </div>
    </div>
  )
}
