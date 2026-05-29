import Icon from '../Icon.jsx'

const NAVS = [
  { id: 'dashboard', label: 'Overview', icon: 'grid' },
  { id: 'employees', label: 'People', icon: 'users' },
  { id: 'leave', label: 'Time Off', icon: 'cal' },
  { id: 'departments', label: 'Departments', icon: 'layers' },
]

export default function Sidebar({ route, onRoute, employeeCount, pendingCount }) {
  return (
    <aside>
      <div className="brand">
        <div className="mark serif">A</div>
        <div>
          <h1>Atrium</h1>
          <small>People Ops</small>
        </div>
      </div>
      <nav>
        <div className="navlbl">Workspace</div>
        {NAVS.map((n) => {
          let badge = null
          if (n.id === 'employees') badge = employeeCount
          if (n.id === 'leave' && pendingCount) badge = pendingCount
          return (
            <button key={n.id} className={'navitem' + (route === n.id ? ' active' : '')} onClick={() => onRoute(n.id)}>
              <Icon name={n.icon} />
              <span>{n.label}</span>
              {badge != null && <span className="count">{badge}</span>}
            </button>
          )
        })}
      </nav>
      <div className="aside-foot">
        <div className="who">
          <div className="av">SC</div>
          <div>
            <b>Selva C.</b>
            <span>HR Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
