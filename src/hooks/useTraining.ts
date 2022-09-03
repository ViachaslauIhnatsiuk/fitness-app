import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { IUser } from '../models/User';
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

    const docRefUser = doc(db, 'users', auth.currentUser?.uid as string);
    const docSnapUser = await getDoc(docRefUser);

    if (!docSnapUser.exists()) {
      throw new Error('Trainings dont exists!');
    }
    if (!docSnap.exists()) throw new Error("You can't get this training!");

    const trainings = docSnap.data() as IWorkouts;

    if (trainings[Number(trainingId)]) {
      const training = trainings[Number(trainingId)];
      setTrainingById(training);
    } else {
      const { customTrainings } = docSnapUser.data() as IUser;
      const customTraining = customTrainings.find(({ id }) => id === Number(trainingId));
      if (customTraining) setTrainingById(customTraining);
    }

    setIsLoading(false);
  }, []);

  const getExercisesById = useCallback(async (trainingId: string): Promise<void> => {
    setIsLoading(true);

    const docRef = doc(db, FirestoreCollection.trainings, FirestoreDocument.trainings);
    const docSnap = await getDoc(docRef);

    const docRefUser = doc(db, 'users', auth.currentUser?.uid as string);
    const docSnapUser = await getDoc(docRefUser);

    if (!docSnap.exists()) throw new Error("You can't get this exercises!");
    if (!docSnapUser.exists()) {
      throw new Error('Trainings dont exists!');
    }

    const trainings = docSnap.data() as IWorkouts;
    let exercises: IExercise[] = [];

    if (trainings[Number(trainingId)]) {
      const training = trainings[Number(trainingId)];
      exercises = training.exercises;
    } else {
      const { customTrainings } = docSnapUser.data() as IUser;
      const customTraining = customTrainings.find(({ id }) => id === Number(trainingId));
      if (customTraining) exercises = customTraining.exercises;
    }
    setExercisesById(exercises);
    setIsLoading(false);
  }, []);

  return { getTrainingById, getExercisesById, trainingById, exercisesById, isLoading };
};

export { useTraining };
