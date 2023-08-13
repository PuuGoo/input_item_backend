import { initializeApp } from "firebase/app"; //initializeApp: khởi tạo ứng dụng là chức năng khi muốn bắt đầu một ứng dụng mới trong Firebase
import {getAuth, GoogleAuthProvider} from 'firebase/auth' // Lựa chọn dịch vụ xác thực của firebase
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCEtRmvILLNg1AWz_d8JrLGHpTqH5K8Vlo",
  authDomain: "fir-course-536ba.firebaseapp.com",
  projectId: "fir-course-536ba",
  storageBucket: "fir-course-536ba.appspot.com",
  messagingSenderId: "598990530035",
  appId: "1:598990530035:web:f3683aec03f47b9fe6de86",
  measurementId: "G-Y2PDT6YQ73"
};

const app = initializeApp(firebaseConfig); // khởi tạo biến 'app' với khởi tạo ứng dụng bằng cấu hình cụ thể để sử dụng tất cả sử dụng các dịch vụ khác nhau của Firebase mà họ cung cấp cho chúng ta
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);