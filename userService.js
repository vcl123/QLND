import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const userCollectionRef = collection(db, 'users');

// Thêm người dùng mới
export const addUser = async (user) => {
  await addDoc(userCollectionRef, user);
};

// Lấy danh sách người dùng
export const getUsers = async () => {
  const data = await getDocs(userCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Cập nhật người dùng
export const updateUser = async (id, updatedUser) => {
  const userDoc = doc(db, 'users', id);
  await updateDoc(userDoc, updatedUser);
};

// Xóa người dùng
export const deleteUser = async (id) => {
  const userDoc = doc(db, 'users', id);
  await deleteDoc(userDoc);
};