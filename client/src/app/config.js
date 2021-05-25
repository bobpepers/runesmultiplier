// export const API_URL = process.env.NODE_ENV === 'production' ? 'http://localhost/api' : 'http://localhost/api';
// export const RUNEBASE_VERSION = '0.18.4';

// Pusher
// export const PUSHER_APP_KEY = '61736641765693f89500';
// export const PUSHER_APP_CLUSTER = 'eu';

// WebSocket
// export const WS_ENDPOINT = 'http://127.0.0.1';

export const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};
