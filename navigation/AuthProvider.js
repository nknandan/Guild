import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try{
                        await auth().signInWithEmailAndPassword(email, password);
                    }catch(e) {
                        console.log(e);
                    }
                },
                passwordReset: async (email) => {
                    try{
                        return auth().sendPasswordResetEmail(email)
                    }catch(e){
                        console.log(e);
                    }
                },
                googleLogin: async () => {
                    try{
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        return auth().signInWithCredential(googleCredential);
                    }catch(e){
                        console.log(e);
                    }
                },
                register: async (name, email, password) => {
                    auth().createUserWithEmailAndPassword(email, password).then(() => {
                        //Auth Done
                        const update = {
                            displayName: name
                        };
                        auth().currentUser.updateProfile(update).then(() => {
                            //User Created Successfully and Name set
                            firestore().collection("Users").doc(auth().currentUser.uid).set({
                                Name: name,
                                Friends: {},
                                UserUid: auth().currentUser.uid
                            }).then(() => {
                                console.log("SignUp Success");
                            //TODO: Show A Notification or toast
                            }).catch(e => {
                                console.log(e);
                                //Failed to Save User Data
                            })
                            
                        }).catch((error) => {
                            //Failed to Set User's Name so deleting the user
                            auth().currentUser.delete();
                            console.log(error);
                        });
                    }).catch((error) => {
                        //SingnUp Failed
                        console.log(error);
                    })
                },
                logout: async () => {
                    try{
                        await auth().signOut();
                    }catch(e) {
                        console.log(e);
                    }
                },
            }}
        
        >
            {children}
        </AuthContext.Provider>
    );
}