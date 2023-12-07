/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = "";
  },
};
