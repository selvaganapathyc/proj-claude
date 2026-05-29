import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { DEPTS, TODAY } from '../data.js'
import { useToast } from '../Toast.jsx'

const blank = { name: '', role: '', dept: 'eng', email: '', phone: '', loc: '', start: TODAY, salary: '', status: 'active', type: 'Full-time' }

// Add / edit an employee. `editing` is an employee object, or null to create.
export default function EmployeeForm({ editing, onClose, onSave, onRemove }) {
  const [form, setForm] = useState(() => (editing ? { ...editing } : blank))
  const nameRef = useRef(null)
  const toast = useToast()

  useEffect(() => { setTimeout(() => nameRef.current?.focus(), 60) }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = () => {
    const name = form.name.trim()
    if (!name) { toast('Please enter a name'); nameRef.current?.focus(); return }
    onSave({
      name,
      role: form.role.trim() || '—',
      dept: form.dept,
      email: form.email.trim(),
      phone: form.phone.trim(),
      loc: form.loc.trim() || '—',
      start: form.start,
      salary: parseInt(form.salary) || 0,
      status: form.status,
      type: form.type || 'Full-time',
    })
  }

  return (
    <>
      <div className="modal-head">
        <div>
          <h3>{editing ? 'Edit person' : 'Add a person'}</h3>
          <p>{editing ? 'Update details for ' + editing.name : 'Bring a new team member into Atrium.'}</p>
        </div>
        <button className="x" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="modal-body">
        <div className="field">
          <label>Full name</label>
          <input ref={nameRef} value={form.name} onChange={set('name')} placeholder="Jordan Rivera" />
        </div>
        <div className="field-row">
          <div className="field"><label>Role</label><input value={form.role} onChange={set('role')} placeholder="Software Engineer" /></div>
          <div className="field"><label>Department</label>
            <select value={form.dept} onChange={set('dept')}>
              {DEPTS.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Email</label><input value={form.email} onChange={set('email')} placeholder="name@atrium.co" /></div>
          <div className="field"><label>Phone</label><input value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Location</label><input value={form.loc} onChange={set('loc')} placeholder="San Francisco" /></div>
          <div className="field"><label>Start date</label><input type="date" value={form.start} onChange={set('start')} /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Salary (USD)</label><input type="number" value={form.salary} onChange={set('salary')} placeholder="120000" /></div>
          <div className="field"><label>Status</label>
            <select value={form.status} onChange={set('status')}>
              <option value="active">Active (on-site)</option>
              <option value="remote">Remote</option>
              <option value="leave">On leave</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-foot">
        {editing && (
          <button className="btn danger" style={{ marginRight: 'auto' }} onClick={() => onRemove(editing.id)}>
            <Icon name="trash" /> Remove
          </button>
        )}
        <button className="btn ghost" onClick={onClose}>Cancel</button>
        <button className="btn" onClick={submit}>{editing ? 'Save changes' : 'Add person'}</button>
      </div>
    </>
  )
}
