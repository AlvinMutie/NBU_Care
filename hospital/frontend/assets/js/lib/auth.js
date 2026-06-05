const KEY_TOKEN = 'nbu_token';
const KEY_USER = 'nbu_user';

export const auth = {
  getToken() {
    return localStorage.getItem(KEY_TOKEN);
  },
  setSession({ token, user }) {
    localStorage.setItem(KEY_TOKEN, token);
    localStorage.setItem(KEY_USER, JSON.stringify(user));
  },
  getUser() {
    const raw = localStorage.getItem(KEY_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  logout() {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
  },
};

