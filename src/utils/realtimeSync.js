// Realtime Communication Bus across tabs and components
// Uses BroadcastChannel with fallback to localStorage events

const CHANNEL_NAME = 'drjerri_realtime_bus';

let channel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch (e) {
  // BroadcastChannel not available, will use localStorage fallback
}

/**
 * Broadcast an event to all open tabs and components
 * @param {string} type - 'ORDER_CREATED' | 'PAYMENT_VERIFIED' | 'RIDER_ASSIGNED' | 'STEP_UPDATED'
 * @param {object} payload - data object
 */
export function broadcastRealtimeEvent(type, payload) {
  const message = { type, payload, timestamp: Date.now() };

  // 1. BroadcastChannel (instant multi-tab)
  if (channel) {
    try {
      channel.postMessage(message);
    } catch (e) {
      // Ignore postMessage error
    }
  }

  // 2. CustomEvent on current window
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('drjerri_realtime_local', { detail: message }));

    // 3. Storage event for cross-tab fallback
    try {
      localStorage.setItem('drjerri_realtime_sync_event', JSON.stringify(message));
    } catch (e) {
      // Ignore storage error
    }
  }
}

/**
 * Subscribe to realtime events
 * @param {function} callback - (event) => void
 * @returns {function} unsubscribe cleanup function
 */
export function subscribeToRealtimeEvents(callback) {
  if (typeof window === 'undefined') return () => {};

  // Local window listener
  const handleLocal = (e) => {
    if (e.detail) callback(e.detail);
  };
  window.addEventListener('drjerri_realtime_local', handleLocal);

  // BroadcastChannel listener
  const handleChannel = (e) => {
    if (e.data) callback(e.data);
  };
  if (channel) {
    channel.addEventListener('message', handleChannel);
  }

  // Cross-tab storage listener
  const handleStorage = (e) => {
    if (e.key === 'drjerri_realtime_sync_event' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        callback(parsed);
      } catch (err) {
        // Ignore parse error
      }
    }
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('drjerri_realtime_local', handleLocal);
    if (channel) {
      channel.removeEventListener('message', handleChannel);
    }
    window.removeEventListener('storage', handleStorage);
  };
}
