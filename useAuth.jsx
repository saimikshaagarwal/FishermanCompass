import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from "../firebase";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  const auth = getAuth();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  
        setIsLoggedIn(true);
      } else {
        setUser(null);   
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return {isLoggedIn,user, handleLogout };
};
export default useAuth;