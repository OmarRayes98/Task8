import Cookies from 'js-cookie';

class StorageHelper {
    setToken(token: string) {
      // localStorage.setItem('token', token);
      Cookies.set('token',token,{
        expires: 90 
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
      }

    getToken() {
      // const token= localStorage.getItem('token');
      const token1 = Cookies.get('token');
      return token1
    }
    getUser() {
        const user= localStorage.getItem('user');
        return user? JSON.parse(user) : null
      }
    removeTokenAndUSer() {
      // localStorage.removeItem('token');
      localStorage.removeItem('user');

      Cookies.remove('token');

    }
  }
  
  const storageHelper = new StorageHelper();
  
  export default storageHelper;
  