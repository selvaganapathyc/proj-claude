import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Modal from './components/Modal.jsx'
import Dashboard from './views/Dashboard.jsx'
import Employees from './views/Employees.jsx'
import Leave from './views/Leave.jsx'
import Departments from './views/Departments.jsx'
import EmployeeForm from './modals/EmployeeForm.jsx'
import EmployeeDetail from './modals/EmployeeDetail.jsx'
import LeaveForm from './modals/LeaveForm.jsx'
import { useStore } from './store.js'
import { useToast } from './Toast.jsx'

export default function App() {
  const store = useStore()
  const toast = useToast()
  const [route, setRoute] = useState('dashboard')
  // modal: null | {type:'form', editing} | {type:'detail', emp} | {type:'leave'}
  const [modal, setModal] = useState(null)
  const close = () => setModal(null)

  const pending = store.leave.filter((l) => l.status === 'pending').length

  const saveEmployee = (data) => {
    if (modal?.editing) {
      store.updateEmployee(modal.editing.id, data)
      toast(data.name + ' updated')
    } else {
      store.addEmployee(data)
      toast(data.name + ' added to the team')
    }
    close()
  }
  const removeEmployee = (id) => {
    const e = store.employees.find((x) => x.id === id)
    store.removeEmployee(id)
    close()
    toast((e ? e.name : 'Person') + ' removed')
  }
  const saveLeave = (req) => {
    store.addLeave(req)
    close()
    toast('Leave request submitted')
  }

  return (
    <div className="app">
      <Sidebar route={route} onRoute={setRoute} employeeCount={store.employees.length} pendingCount={pending} />
      <main>
        {route === 'dashboard' && (
          <Dashboard
            employees={store.employees}
            leave={store.leave}
            onAdd={() => setModal({ type: 'form', editing: null })}
            onOpenEmployee={(emp) => setModal({ type: 'detail', emp })}
          />
        )}
        {route === 'employees' && (
          <Employees
            employees={store.employees}
            onAdd={() => setModal({ type: 'form', editing: null })}
            onOpenEmployee={(emp) => setModal({ type: 'detail', emp })}
          />
        )}
        {route === 'leave' && (
          <Leave
            employees={store.employees}
            leave={store.leave}
            onNew={() => setModal({ type: 'leave' })}
            onSetStatus={(id, s) => { store.setLeaveStatus(id, s); toast('Request ' + s) }}
            onRemove={(id) => { store.removeLeave(id); toast('Request deleted') }}
          />
        )}
        {route === 'departments' && <Departments employees={store.employees} />}
      </main>

      <Modal open={!!modal} onClose={close}>
        {modal?.type === 'form' && (
          <EmployeeForm editing={modal.editing} onClose={close} onSave={saveEmployee} onRemove={removeEmployee} />
        )}
        {modal?.type === 'detail' && (
          <EmployeeDetail
            emp={modal.emp}
            leave={store.leave}
            onClose={close}
            onEdit={(emp) => setModal({ type: 'form', editing: emp })}
          />
        )}
        {modal?.type === 'leave' && (
          <LeaveForm employees={store.employees} onClose={close} onSave={saveLeave} />
        )}
      </Modal>
    </div>
  )
}
