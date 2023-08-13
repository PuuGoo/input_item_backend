import {auth, googleProvider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { useState } from 'react'; // cho phép theo dõi thành phần chức năng thường để cập đến dữ liệu hoặc thuộc tính   

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(auth?.currentUser?.photoURL);

    const signIn = async () => { // async sử dụng vì hầu hết các chức năng sẽ không đồng bộ
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch(err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => { // async sử dụng vì hầu hết các chức năng sẽ không đồng bộ
        try {
        await signInWithPopup(auth, googleProvider)
        alert("Sign successfully!")
        }
        catch(err) {
            console.error(err);
        }
    };

    const logout = async () => { // async sử dụng vì hầu hết các chức năng sẽ không đồng bộ
        try {
        await signOut(auth)
        alert("Logout successfully!")
        }
        catch(err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} type='password'></input>
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign in With Google</button>

            <button onClick={logout}>Logout</button>
        </div>
    );
}