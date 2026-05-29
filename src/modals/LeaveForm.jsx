import { useState } from 'react'
import Icon from '../Icon.jsx'
import { useToast } from '../Toast.jsx'

const TYPES = ['Vacation', 'Sick', 'Parental', 'Personal']

// Log a new leave request on behalf of an employee.
export default function LeaveForm({ employees, onClose, onSave }) {
  const [form, setForm] = useState({
    emp: employees[0]?.id ?? 0,
    type: 'Vacation',
    from: '2026-06-01',
    to: '2026-06-05',
    note: '',
  })
  const toast = useToast()
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = () => {
    if (!form.from || !form.to || form.to < form.from) { toast('Please pick a valid date range'); return }
    onSave({ emp: parseInt(form.emp), type: form.type, from: form.from, to: form.to, note: form.note.trim() })
  }

  return (
    <>
      <div className="modal-head">
        <div>
          <h3>New leave request</h3>
          <p>Log time off on behalf of a team member.</p>
        </div>
        <button className="x" onClick={onClose}><Icon name="x" /></button>
      </div>
      <div className="modal-body">
        <div className="field">
          <label>Employee</label>
          <select value={form.emp} onChange={set('emp')}>
            {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Type</label>
          <select value={form.type} onChange={set('type')}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field-row">
          <div className="field"><label>From</label><input type="date" value={form.from} onChange={set('from')} /></div>
          <div className="field"><label>To</label><input type="date" value={form.to} onChange={set('to')} /></div>
        </div>
        <div className="field">
          <label>Note</label>
          <textarea value={form.note} onChange={set('note')} placeholder="Reason or context…" />
        </div>
      </div>
      <div className="modal-foot">
        <button className="btn ghost" onClick={onClose}>Cancel</button>
        <button className="btn" onClick={submit}>Submit request</button>
      </div>
    </>
  )
}
