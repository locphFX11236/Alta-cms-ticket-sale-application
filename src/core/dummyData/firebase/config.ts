import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDKvM_UxGOU3DpuoS1-LSlaxDD7bass9fI",
    authDomain: "ticket-sale-application-81db8.firebaseapp.com",
    projectId: "ticket-sale-application-81db8",
    storageBucket: "ticket-sale-application-81db8.appspot.com",
    messagingSenderId: "115680074973",
    appId: "1:115680074973:web:7af00705f0d494f605cf34",
    measurementId: "G-KZR3FBD418"
}; // Đoạn mã cho đối tượng Config của ứng dụng liên kết với Firebase

const app = initializeApp(firebaseConfig); // Khởi tạo Firebase
const db = getFirestore(app); // Liên kết với fire store

export const dataPending = async () => {
    const datasCol1 = collection(db, 'ticket-list'); // Truy cập vào collection 'ticket-list'
    const dataSnapshot1 = await getDocs(datasCol1); // Lấy data từ dữ liệu trả về trong .docs
    const dataList1 = dataSnapshot1.docs.map( (doc) => ({ ...doc.data(), id: doc.id }) ); // Xử lý data nhận được

    const datasCol2 = collection(db, 'ticket-group'); // Truy cập vào collection 'ticket-group'
    const dataSnapshot2 = await getDocs(datasCol2); // Lấy data từ dữ liệu trả về trong .docs
    const dataList2 = dataSnapshot2.docs.map( (doc) => ({ ...doc.data(), id: doc.id }) ); // Xử lý data nhận được

    const dataList = {
        ticketList: dataList1,
        ticketGroup: dataList2
    };
    return dataList;
}; // Lấy dữ liệu từ fire store

export const AddData = async (data: any, coll: any) => {
    return await addDoc( collection( db, coll ), data );
};

export const UpdateData = async (data: any, coll: any) => {
    return await updateDoc( doc( db, coll, data.id ), data);
}