import { useEffect, useState } from 'react';
import { useChatStore } from '../../stores/chatStore';

export function ToastHost() {
  const notifications = useChatStore((state) => state.notifications);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (event: Event) => {
      setError((event as CustomEvent<string>).detail);
      window.setTimeout(() => setError(''), 3500);
    };
    window.addEventListener('ggarena:error', handler);
    return () => window.removeEventListener('ggarena:error', handler);
  }, []);

  const latest = error || notifications[0]?.message;
  if (!latest) return null;
  return <div className={`toast ${error ? 'toast--error' : ''}`} role="status">{latest}</div>;
}
