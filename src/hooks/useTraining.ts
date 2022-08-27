import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { db } from '../firebase/firebase';
import {
  FirestoreCollection,
  FirestoreDocument,
  IExercise,
  IWorkout,
  IWorkouts
} from '../models/Workout';

const useTraining = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trainingById, setTrainingById] = useState<IWorkout>();
  const [exercisesById, setExercisesById] = useState<IExercise[]>();

  const getTrainingById = useCallback(async (trainingId: string): Promise<void> => {
    setIsLoading(true);

    const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("You can't get this training!");

    const trainings = docSnap.data() as IWorkouts;
    const training = trainings[Number(trainingId)];

    setTrainingById(training);
    setIsLoading(false);
  }, []);

  const getExercisesById = useCallback(async (trainingId: string): Promise<void> => {
    setIsLoading(true);

    const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("You can't get this exercises!");

    const trainings = docSnap.data() as IWorkouts;
    const { exercises } = trainings[Number(trainingId)];

    setExercisesById(exercises);
    setIsLoading(false);
  }, []);

  return { getTrainingById, getExercisesById, trainingById, exercisesById, isLoading };
};

export { useTraining };
