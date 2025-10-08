import React, { useEffect, useState } from 'react';
import { auth, db, functionsClient } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

type UserListItem = { uid: string; name?: string; email?: string };

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        // If you maintain a users collection in Firestore, read from it
        const q = collection(db!, 'users');
        const snap = await getDocs(q);
        const list: UserListItem[] = snap.docs.map(d => ({ uid: d.id, ...(d.data() as any) }));
        setUsers(list);
      } catch (e) {
        console.error('Failed to load users', e);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const toggleAi = async (uid: string) => {
    if (!functionsClient) return alert('Functions not available in this environment');
    const callable = httpsCallable(functionsClient as any, 'setUserAi');
    try {
      await callable({ uid, aiEnabled: true });
      alert('Requested setting AI flag. The user token may need refresh.');
    } catch (e: any) {
      console.error('Error calling function', e);
      alert('Failed: ' + (e.message || e));
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
      <p className="mb-4">Set per-user AI feature flags or claims.</p>
      <ul>
        {users.map(u => (
          <li key={u.uid} className="mb-2">
            <strong>{u.name || u.email || u.uid}</strong>
            <button className="ml-4 px-2 py-1 bg-blue-600 text-white rounded" onClick={() => toggleAi(u.uid)}>
              Enable AI
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
