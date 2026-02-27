/**
 * Replace with your Tailscale IP address.
 * Find it by running: tailscale ip -4
 */
const TAILSCALE_IP = '100.XX.X.X';
const PORT = 3000;

export const SERVER_URL = `http://${TAILSCALE_IP}:${PORT}`;
export const API_URL = `${SERVER_URL}/api`;
