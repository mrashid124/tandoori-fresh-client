
import React, { createContext, useEffect, useState } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup
 } from "firebase/auth";
import app from '../firebase/firebase.init';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const auth = getAuth(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log(loading, user);

    // const createUser = (email, password) => {
    //     setLoading(true);
    //     return createUserWithEmailAndPassword(auth, email, password);
    // }

    const createUser = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const currentUser = userCredential.user;
          await updateProfile(currentUser, {
            displayName,
            photoURL,
          });
          setUser({ ...currentUser, displayName, photoURL });
        } catch (error) {
          console.error("Registration Error:", error.message);
          throw error;
        } finally {
          setLoading(false);
        }
      };
    
      const loginUser = async (email, password) => {
        setLoading(true);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
        } catch (error) {
          console.error("Login Error:", error.message);
          throw error;
        } finally {
          setLoading(false);
        }
      };
    
      const logOut = async () => {
        setLoading(true);
        try {
          await signOut(auth);
          setUser(null);
        } catch (error) {
          console.error("Sign-Out Error:", error.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, []);

      const googlePopup = async () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, googleProvider);
          setUser(result.user);
        } catch (error) {
          console.error("Google Sign-In Error:", error.message);
        } finally {
          setLoading(false);
        }
      };

    const authInfo = {
        user,
        loading,
   
        createUser, 
        loginUser, 
        logOut,
        googlePopup,
      };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;