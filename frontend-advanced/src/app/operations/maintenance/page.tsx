'use client';
import React, { useState, useRef } from 'react';
import NavBar from '../../components/NavBar';

interface Space { id: number; name: string; }
const statusOptions = ['Open', 'In Progress', 'Completed', 'Needs Approval'];
const users = ['John', 'Sarah', 'Mike'];

interface Request {
  id: string;
  type: string;
  due: string;
  spaceId: number;
  notes: string;
  attachment?: string;
  status: string;
  assignedTo: string;
}

const spaces: Space[] = [
  { id: 1, name: 'Main Hall' },
  { id: 2, name: 'Garden Room' },
  { id: 3, name: 'Rooftop' },
];
const typeOptions = ['Cleaning', 'HOV', 'Repairs'];
const conditionOptions = ['Good', 'Out of Order', 'Needs Follow-up'];

function generateRequestId() {
  return 'REQ-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

const sampleRequests: Request[] = [
  {
    id: 'REQ-1A2B3C',
    type: 'Cleaning',
    due: '2024-07-28',
    spaceId: 1,
    notes: 'Clean up after event, focus on stage area.',
    attachment: undefined,
    status: 'Open',
    assignedTo: 'John',
  },
  {
    id: 'REQ-4D5E6F',
    type: 'HOV',
    due: '2024-07-29',
    spaceId: 2,
    notes: 'High Occupancy Verification for Garden Room.',
    attachment: undefined,
    status: 'Needs Approval',
    assignedTo: 'Sarah',
  },
  {
    id: 'REQ-7G8H9I',
    type: 'Repairs',
    due: '2024-07-30',
    spaceId: 3,
    notes: 'Fix broken light on rooftop.',
    attachment: undefined,
    status: 'In Progress',
    assignedTo: 'Mike',
  },
];

interface CompletionState {
  id: string;
  photo: string;
  initials: string;
}

export default function MaintenancePage() {
  const [requests, setRequests] = useState<Request[]>(sampleRequests);
  const [form, setForm] = useState<Omit<Request, 'id' | 'attachment'> & { attachment?: string }>({
    type: typeOptions[0],
    due: '',
    spaceId: spaces[0].id,
    notes: '',
    attachment: undefined,
    status: statusOptions[0],
    assignedTo: users[0],
  });
  const [filters, setFilters] = useState<{ status: string; type: string; space: string; search: string }>({ status: '', type: '', space: '', search: '' });
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [completionPhoto, setCompletionPhoto] = useState<string>('');
  const [completionInitials, setCompletionInitials] = useState<string>('');
  const completionFileInputRef = useRef<HTMLInputElement>(null);
  const [completionNotes, setCompletionNotes] = useState<string>('');
  const [completionCondition, setCompletionCondition] = useState<string>(conditionOptions[0]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'spaceId' ? Number(value) : value }));
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setForm(f => ({ ...f, attachment: ev.target?.result as string }));
        setPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newRequest: Request = {
      id: generateRequestId(),
      type: form.type,
      due: form.due,
      spaceId: form.spaceId,
      notes: form.notes,
      attachment: form.attachment,
      status: form.status,
      assignedTo: form.assignedTo,
    };
    setRequests(reqs => [newRequest, ...reqs]);
    setForm({ type: typeOptions[0], due: '', spaceId: spaces[0].id, notes: '', attachment: undefined, status: statusOptions[0], assignedTo: users[0] });
    setPreview(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  }

  const filteredRequests = requests.filter(r =>
    (!filters.status || r.status === filters.status) &&
    (!filters.type || r.type === filters.type) &&
    (!filters.space || r.spaceId === Number(filters.space)) &&
    (!filters.search ||
      r.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.notes.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.assignedTo.toLowerCase().includes(filters.search.toLowerCase())
    )
  );

  // Analytics
  const now = new Date();
  const openCount = requests.filter(r => r.status === 'Open').length;
  const inProgressCount = requests.filter(r => r.status === 'In Progress').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;
  const overdueCount = requests.filter(r => r.status !== 'Completed' && new Date(r.due) < now).length;
  const typeCounts = typeOptions.map(type => requests.filter(r => r.type === type).length);

  function handleStartComplete(id: string) {
    setCompleting(id);
    setCompletionPhoto('');
    setCompletionInitials('');
    setCompletionNotes('');
    setCompletionCondition(conditionOptions[0]);
    if (completionFileInputRef.current) completionFileInputRef.current.value = '';
  }
  function handleCompletionPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setCompletionPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }
  function handleCompleteRequest() {
    setRequests(reqs => reqs.map(r =>
      r.id === completing
        ? {
            ...r,
            attachment: completionPhoto,
            notes: r.notes + `\nCompleted by: ${completionInitials}\nCondition: ${completionCondition}\nCompletion Notes: ${completionNotes}`
          }
        : r
    ));
    setCompleting(null);
    setCompletionPhoto('');
    setCompletionInitials('');
    setCompletionNotes('');
    setCompletionCondition(conditionOptions[0]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <NavBar />
      <div style={{ maxWidth: 700, margin: '40px auto 0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#232323', marginBottom: 24 }}>Maintenance Requests</h1>
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #6a82fb22', padding: 32, marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Request Type</label>
              <select name="type" value={form.type} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Due Date</label>
              <input name="due" type="date" value={form.due} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec' }} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Assigned To</label>
              <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
                {users.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Location (Space)</label>
              <select name="spaceId" value={form.spaceId} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec' }}>
                {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec' }} />
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Attachment</label>
            <input ref={fileInputRef} type="file" accept="image/*,application/pdf" onChange={handleFileChange} style={{ marginTop: 4 }} />
            {preview && (
              <div style={{ marginTop: 8 }}>
                <span style={{ fontSize: 14, color: '#888' }}>Preview:</span><br />
                {preview.startsWith('data:image') ? (
                  <img src={preview} alt="attachment" style={{ maxWidth: 180, maxHeight: 120, borderRadius: 8, marginTop: 4 }} />
                ) : (
                  <a href={preview} target="_blank" rel="noopener noreferrer" style={{ color: '#6a82fb' }}>View Attachment</a>
                )}
              </div>
            )}
          </div>
          <button type="submit" style={{ background: '#6a82fb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 17, cursor: 'pointer', marginTop: 8 }}>Submit Request</button>
        </form>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 18, minWidth: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18 }}>{openCount}</div>
            <div style={{ color: '#888', fontSize: 14 }}>Open</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 18, minWidth: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18 }}>{inProgressCount}</div>
            <div style={{ color: '#888', fontSize: 14 }}>In Progress</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 18, minWidth: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 18 }}>{completedCount}</div>
            <div style={{ color: '#888', fontSize: 14 }}>Completed</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 18, minWidth: 120, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: '#e53935', fontSize: 18 }}>{overdueCount}</div>
            <div style={{ color: '#e53935', fontSize: 14 }}>Overdue</div>
          </div>
          {/* Bar chart placeholder */}
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 18, minWidth: 220, textAlign: 'center', flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#232323', fontSize: 16, marginBottom: 6 }}>Requests by Type</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 48 }}>
              {typeCounts.map((count, i) => (
                <div key={typeOptions[i]} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: '#6a82fb', width: 18, height: `${count * 16}px`, borderRadius: 4, marginBottom: 2, transition: 'height 0.2s' }}></div>
                  <div style={{ fontSize: 12, color: '#888' }}>{typeOptions[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <select name="status" value={filters.status} onChange={handleFilterChange} style={{ padding: 8, borderRadius: 8, border: '1px solid #ececec', minWidth: 120 }}>
            <option value="">All Statuses</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="type" value={filters.type} onChange={handleFilterChange} style={{ padding: 8, borderRadius: 8, border: '1px solid #ececec', minWidth: 120 }}>
            <option value="">All Types</option>
            {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="space" value={filters.space} onChange={handleFilterChange} style={{ padding: 8, borderRadius: 8, border: '1px solid #ececec', minWidth: 120 }}>
            <option value="">All Spaces</option>
            {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search..." style={{ padding: 8, borderRadius: 8, border: '1px solid #ececec', minWidth: 140 }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#232323', marginBottom: 16 }}>Recent Requests</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {filteredRequests.length === 0 && (
            <div style={{ color: '#aaa', fontSize: 16, textAlign: 'center', marginTop: 20 }}>No requests yet.</div>
          )}
          {filteredRequests.map(req => (
            <div key={req.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #6a82fb11', padding: 20, display: 'flex', flexDirection: 'column', gap: 8, border: '1.5px solid #ececec' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#6a82fb', fontSize: 16 }}>ID: {req.id}</span>
                <span style={{ color: '#888', fontSize: 15 }}>Type: <b>{req.type}</b></span>
                <span style={{ color: '#888', fontSize: 15 }}>Due: <b>{req.due}</b></span>
                <span style={{ color: '#888', fontSize: 15 }}>Location: <b>{spaces.find(s => s.id === req.spaceId)?.name}</b></span>
                <span style={{ color: '#888', fontSize: 15 }}>Status: <b>{req.status}</b></span>
                <span style={{ color: '#888', fontSize: 15 }}>Assigned To: <b>{req.assignedTo}</b></span>
              </div>
              <div style={{ color: '#444', fontSize: 15, marginLeft: 2, marginBottom: 4 }}><b>Notes:</b> {req.notes}</div>
              {req.attachment && (
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontSize: 14, color: '#888' }}>Attachment:</span><br />
                  {req.attachment.startsWith('data:image') ? (
                    <img src={req.attachment} alt="attachment" style={{ maxWidth: 120, maxHeight: 80, borderRadius: 6, marginTop: 2 }} />
                  ) : (
                    <a href={req.attachment} target="_blank" rel="noopener noreferrer" style={{ color: '#6a82fb' }}>View Attachment</a>
                  )}
                </div>
              )}
              {!req.attachment && (
                <button onClick={() => handleStartComplete(req.id)} style={{ background: '#34a853', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Complete</button>
              )}
            </div>
          ))}
        </div>
        {/* Completion Modal/Section */}
        {completing && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(31,38,135,0.12)', padding: 32, width: 380, maxWidth: '95vw', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#6a82fb', marginBottom: 12 }}>Complete Request</div>
              <div style={{ marginBottom: 12 }}>Please upload a photo of the completed task, enter your initials, select condition, and add notes as proof.</div>
              <input ref={completionFileInputRef} type="file" accept="image/*" onChange={handleCompletionPhotoChange} style={{ marginBottom: 10 }} />
              {completionPhoto && <img src={completionPhoto} alt="completion" style={{ width: '100%', maxHeight: 120, objectFit: 'contain', margin: '8px 0' }} />}
              <input
                type="text"
                value={completionInitials}
                onChange={e => setCompletionInitials(e.target.value)}
                placeholder="Enter your initials"
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec', marginBottom: 12 }}
                maxLength={8}
              />
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Condition</label>
              <select
                value={completionCondition}
                onChange={e => setCompletionCondition(e.target.value)}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec', marginBottom: 12 }}
              >
                {conditionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <label style={{ fontWeight: 600, color: '#232323', marginBottom: 2 }}>Completion Notes</label>
              <textarea
                value={completionNotes}
                onChange={e => setCompletionNotes(e.target.value)}
                placeholder="Add any notes about the task completion..."
                rows={2}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ececec', marginBottom: 12 }}
              />
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                <button type="button" onClick={() => setCompleting(null)} style={{ background: '#ececec', color: '#232323', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
                <button type="button" onClick={handleCompleteRequest} disabled={!completionPhoto || !completionInitials} style={{ background: '#34a853', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, cursor: completionPhoto && completionInitials ? 'pointer' : 'not-allowed' }}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 