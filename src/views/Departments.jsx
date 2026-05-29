import { DEPTS } from '../data.js'
import { initials, avColor, avgTenureYears } from '../helpers.js'

export default function Departments({ employees }) {
  return (
    <div className="view">
      <div className="topbar">
        <div>
          <div className="eyebrow">Structure</div>
          <h2 className="serif">Departments</h2>
          <p>{DEPTS.length} teams building Atrium. Headcount and average tenure update live.</p>
        </div>
      </div>

      <div className="dept-grid">
        {DEPTS.map((d) => {
          const team = employees.filter((e) => e.dept === d.id)
          return (
            <div className="deptcard" key={d.id}>
              <div className="bar" style={{ background: d.color }} />
              <h3>{d.name}</h3>
              <div className="lead">Led by {d.lead}</div>
              <div className="nums">
                <div><span>People</span><b>{team.length}</b></div>
                <div><span>Avg tenure</span><b>{avgTenureYears(team)}y</b></div>
              </div>
              <div className="avstack">
                {team.slice(0, 5).map((e) => (
                  <div className="av" key={e.id} style={{ background: avColor(e.id) }} title={e.name}>{initials(e.name)}</div>
                ))}
                {team.length > 5 && <div className="more">+{team.length - 5}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
