// Base URL of the Zutor API. Override at build time with VITE_API_URL.
export const API_URL = import.meta.env.VITE_API_URL || `http://${location.hostname}:4000/api`;
