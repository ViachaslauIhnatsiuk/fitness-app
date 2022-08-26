import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
  FirestoreCollection,
  FirestoreDocument,
  IExercise,
  IWorkout,
  IWorkouts
} from '../models/Workout';

export default class TrainingService {
  public static getTrainingById = async (trainingId: number): Promise<IWorkout> => {
    const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("You can't get this training!");

    const trainings = docSnap.data() as IWorkouts;
    return trainings[Number(trainingId)];
  };

  public static getExercisesById = async (trainingId: number): Promise<IExercise[]> => {
    const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("You can't get this training!");

    const trainings = docSnap.data() as IWorkouts;
    const { exercises } = trainings[Number(trainingId)];
    return exercises;
  };
}
