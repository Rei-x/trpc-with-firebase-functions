import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { db } from '../firebase';

interface Question {
  text: string;
}

const postConverter = {
  toFirestore(post: Question): DocumentData {
    return post;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Question {
    const data = snapshot.data();
    return {
      text: data.text,
    };
  },
};

export const post = db.collection('questions').withConverter(postConverter);
