import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from "firebase/firestore";

import { db } from "../firebase/config";

const productsRef = collection(db,"products");

const isValidProduct = (doc) => Boolean(doc.data().name?.trim());

export const getProducts = async() => {
    try{
        const snapshot = await getDocs(productsRef)
        const productsFormat = snapshot.docs
          .filter(isValidProduct)
          .map((doc)=>{
            return {id: doc.id, ...doc.data()}
        });
        return productsFormat;
    }catch(error){
        console.error("Error al traer productos:", error);
        return [];
    }
};

export const getProductsById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()){
            const product = {id: snapshot.id, ...snapshot.data()};
            return product;
        }else{
            return null;
        }
    }catch(error){
            console.error("Error al traer el producto por ID:", error);
            return null;
        }
}

export const getByCategory = async (category) => {
    try {
        let queryRef;
        if (category){
            queryRef = query(productsRef, where ("category", "==", category));
        }else{
            queryRef = productsRef;
        }
        const snapshot = await getDocs(queryRef);
        const productsFormat = snapshot.docs
          .filter(isValidProduct)
          .map((doc)=>{
            return { id: doc.id, ...doc.data()};
        });
        return productsFormat;
    }catch(error){
        console.error("Error al filtrar por productos:",error);
        return [];
    }
};

export const getCategories = async () => {
  try {
    const snapshot = await getDocs(productsRef);
    const categories = [...new Set(
      snapshot.docs
        .map(doc => doc.data().category)
        .filter(Boolean)
    )];
    return categories.sort();
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    
    const docRef = await addDoc(productsRef, productData);

    return docRef.id; 
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, productData);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};