import { useEffect, useRef, useState, useCallback } from 'react';
import { API_URL } from '../config';

export type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

const POLL_INTERVAL = 8_000;
const TIMEOUT = 5_000;

export function useServerConnection() {
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [latency, setLatency] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = useCallback(async () => {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT);

      const res = await fetch(`${API_URL}/health`, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        setLatency(Date.now() - start);
        setStatus('connected');
      } else {
        setLatency(null);
        setStatus('disconnected');
      }
    } catch {
      setLatency(null);
      setStatus('disconnected');
    }
  }, []);

  useEffect(() => {
    check();
    intervalRef.current = setInterval(check, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [check]);

  return { status, latency, retry: check };
}
