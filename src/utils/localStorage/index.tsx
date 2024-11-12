class LocalStorageHelper {
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
      }

    getToken() {
      const token= localStorage.getItem('token');
      return token
    }
    getUser() {
        const user= localStorage.getItem('user');
        return user? JSON.parse(user) : null
      }
    removeTokenAndUSer() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

    }
  }
  
  const localStorageHelper = new LocalStorageHelper();
  
  export default localStorageHelper;
  