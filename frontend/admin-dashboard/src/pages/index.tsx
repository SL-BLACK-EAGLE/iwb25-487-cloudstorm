import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

interface UserAuth { email: string; password: string; }
interface AidRequestInput { title: string; description?: string; category?: string; urgency_level?: number; }

export default function Home() {
  const [registerForm, setRegisterForm] = useState<UserAuth>({ email: '', password: '' });
  const [token, setToken] = useState<string>('');
  const [aidForm, setAidForm] = useState<AidRequestInput>({ title: '' });
  const [aidRequests, setAidRequests] = useState<any[]>([]);
  const [donorForm, setDonorForm] = useState({ name: '', email: '' });
  const [donors, setDonors] = useState<any[]>([]);
  const [volunteerForm, setVolunteerForm] = useState({ name: '', skills: '' });
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [assignTaskId, setAssignTaskId] = useState('');
  const [log, setLog] = useState<string>('');

  const logMsg = (m: string) => setLog(l => `${new Date().toLocaleTimeString()} - ${m}\n${l}`);

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, registerForm);
      setToken(res.data.token);
      logMsg('Registered & token stored');
    } catch (e: any) { logMsg('Register failed: ' + e.message); }
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, registerForm);
      setToken(res.data.token);
      logMsg('Logged in & token stored');
    } catch (e: any) { logMsg('Login failed: ' + e.message); }
  };
  const loadAidRequests = async () => {
    try { const res = await axios.get(`${API_BASE}/aid/requests`); setAidRequests(res.data); } catch (e:any){ logMsg('Load aid requests failed'); }
  };
  const createAidRequest = async () => {
    try {
      await axios.post(`${API_BASE}/aid/requests`, aidForm, { headers: { Authorization: `Bearer ${token}` } });
      logMsg('Aid request created');
      loadAidRequests();
    } catch (e:any){ logMsg('Create aid request failed'); }
  };
  const createDonor = async () => {
    try { await axios.post(`${API_BASE}/donors`, donorForm); logMsg('Donor created'); loadDonors(); } catch(e:any){ logMsg('Create donor failed'); }
  };
  const loadDonors = async () => { try { const r = await axios.get(`${API_BASE}/donors`); setDonors(r.data);} catch{} };
  const createVolunteer = async () => { try { await axios.post(`${API_BASE}/volunteers`, { name: volunteerForm.name, skills: volunteerForm.skills.split(',').map(s=>s.trim()).filter(Boolean) }); logMsg('Volunteer created'); loadVolunteers(); } catch(e:any){ logMsg('Create volunteer failed'); } };
  const loadVolunteers = async () => { try { const r = await axios.get(`${API_BASE}/volunteers`); setVolunteers(r.data);} catch{} };
  const createTask = async () => { try { await axios.post(`${API_BASE}/volunteers/tasks`, { title: taskTitle }); logMsg('Task created'); loadTasks(); } catch(e:any){ logMsg('Task create failed'); } };
  const loadTasks = async () => { try { const r = await axios.get(`${API_BASE}/volunteers/tasks`); setTasks(r.data);} catch{} };
  const assignTask = async () => { try { await axios.post(`${API_BASE}/volunteers/tasks/assign/${assignTaskId}`); logMsg('Task assignment attempted'); loadTasks(); } catch(e:any){ logMsg('Assign failed'); } };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20, lineHeight: 1.4 }}>
      <h1>SmartRelief Admin Dashboard</h1>
      <p style={{ fontSize: 12 }}>API Base: {API_BASE}</p>
      <section style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 260 }}>
          <h2>Auth</h2>
            <input placeholder='email' value={registerForm.email} onChange={e=>setRegisterForm(f=>({...f,email:e.target.value}))} />
            <input placeholder='password' type='password' value={registerForm.password} onChange={e=>setRegisterForm(f=>({...f,password:e.target.value}))} />
            <div>
              <button onClick={handleRegister}>Register</button>
              <button onClick={handleLogin}>Login</button>
            </div>
            <div>Token: <code style={{ fontSize: 10 }}>{token.slice(0,30)}...</code></div>
        </div>
        <div style={{ minWidth: 260 }}>
          <h2>Aid Requests</h2>
          <input placeholder='title' value={aidForm.title} onChange={e=>setAidForm(f=>({...f,title:e.target.value}))} />
          <input placeholder='category' value={aidForm.category||''} onChange={e=>setAidForm(f=>({...f,category:e.target.value}))} />
          <input placeholder='urgency (1-5)' type='number' onChange={e=>setAidForm(f=>({...f,urgency_level: Number(e.target.value)}))} />
          <button onClick={createAidRequest} disabled={!token}>Create Aid</button>
          <button onClick={loadAidRequests}>Refresh</button>
          <ul style={{ maxHeight:150, overflow:'auto' }}>{aidRequests.map(a=> <li key={a.id}>{a.title} ({a.urgency_level})</li>)}</ul>
        </div>
        <div style={{ minWidth: 260 }}>
          <h2>Donors</h2>
          <input placeholder='name' value={donorForm.name} onChange={e=>setDonorForm(f=>({...f,name:e.target.value}))} />
          <input placeholder='email' value={donorForm.email} onChange={e=>setDonorForm(f=>({...f,email:e.target.value}))} />
          <button onClick={createDonor}>Add Donor</button>
          <button onClick={loadDonors}>Refresh</button>
          <ul style={{ maxHeight:150, overflow:'auto' }}>{donors.map(d=> <li key={d.id}>{d.name}</li>)}</ul>
        </div>
        <div style={{ minWidth: 260 }}>
          <h2>Volunteers & Tasks</h2>
          <input placeholder='name' value={volunteerForm.name} onChange={e=>setVolunteerForm(f=>({...f,name:e.target.value}))} />
          <input placeholder='skills (comma)' value={volunteerForm.skills} onChange={e=>setVolunteerForm(f=>({...f,skills:e.target.value}))} />
          <div>
            <button onClick={createVolunteer}>Add Volunteer</button>
            <button onClick={loadVolunteers}>Load Vols</button>
          </div>
          <input placeholder='task title' value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} />
          <button onClick={createTask}>Add Task</button>
          <button onClick={loadTasks}>Load Tasks</button>
          <input placeholder='task id to assign' value={assignTaskId} onChange={e=>setAssignTaskId(e.target.value)} />
          <button onClick={assignTask}>Assign</button>
          <ul style={{ maxHeight:150, overflow:'auto' }}>{tasks.map(t=> <li key={t.id}>{t.title} - {t.status} {t.volunteerId?`-> ${t.volunteerId}`:''}</li>)}</ul>
        </div>
      </section>
      <section>
        <h2>Logs</h2>
        <textarea style={{ width:'100%', height:150 }} value={log} readOnly />
      </section>
    </div>
  );
}
