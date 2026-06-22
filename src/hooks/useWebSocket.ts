import { useEffect } from 'react';
import { mockWebSocket } from '../mock/websocket';
import { useChatStore } from '../stores/chatStore';
import { usePlayerStore } from '../stores/playerStore';

export function useWebSocket() {
  const setPlayerPresence = useChatStore((state) => state.setPlayerPresence);
  const updateLiveScore = useChatStore((state) => state.updateLiveScore);
  const pushNotification = useChatStore((state) => state.pushNotification);
  const setOnlineStatus = usePlayerStore((state) => state.setOnlineStatus);

  useEffect(() => {
    return mockWebSocket.connect((event) => {
      if (event.type === 'online:update') {
        setOnlineStatus(event.payload.playerId, event.payload.status);
        setPlayerPresence(event.payload.playerId, event.payload.status !== 'offline');
      }
      if (event.type === 'score:update') updateLiveScore(event.payload);
      if (event.type === 'notification') pushNotification(event.payload);
    });
  }, [pushNotification, setOnlineStatus, setPlayerPresence, updateLiveScore]);
}
