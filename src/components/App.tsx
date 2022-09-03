import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth, db, doc, getDoc, onAuthStateChanged } from '../firebase/firebase';
import { useAppSelector } from '../store/model';
import { useAppDispatch } from '../store/store';
import { selectProfile } from '../store/selectors';
import { setLogIn, setLogOut, setUserState } from '../store/slices/profileSlice';
import { Home } from '../pages/home/Home';
import { Workout } from '../pages/workout/Workout';
import { Food } from '../pages/food/Food';
import { Profile } from '../pages/profile/Profile';
import { Layout } from './layout/Layout';
import { NotFound } from '../pages/notFound/NotFound';
import { Meal } from './meal/Meal';
import { Recipes } from './recipes/Recipes';
import { RecipesCategory } from './recipes/recipesCategory/RecipesCategory';
import { Recipe } from './recipes/recipe/Recipe';
import { TrainingSets } from './TrainingSets/TrainingSets';
import { TrainingVideos } from './TrainingVideos/TrainingVideos';
import { Exercises } from './TrainingSets/exercises/Exercises';
import { TrainingActive } from './TrainingSets/trainingActive/TrainingActive';
import { EditProfile } from './editProfile/EditProfile';
import { EditPersonalData } from './editPersonalData/EditPersonalData';
import { Welcome } from '../pages/welcome/Welcome';
import { SocialAuthentication } from './authentication/socialAuthentication/SocialAuthentication';
import { PasswordAuthentication } from './authentication/passwordAuthentication/PasswordAuthentication';
import { ForgotPassword } from './authentication/forgotPassword/ForgotPassword';
import { RegistrationUserData } from './registration/registrationUserData/RegistrationUserData';
import { RegistrationUserProfile } from './registration/registrationUserProfile/RegistrationUserProfile';
import { Videos } from './TrainingVideos/videos/Videos';
import { VideoPage } from './TrainingVideos/videoPage/VideoPage';
import s from './App.module.css';
import { IUser } from '../models/User';
import { FavoriteVideos } from './favorite/favoriteVideos/FavoriteVideos';
import { FavoriteTrainings } from './favorite/FavoriteTrainings/FavoriteTrainings';
import { FavoriteRecipes } from './favorite/favoriteRecipes/FavoriteRecipes';
import { RecipeWrapper } from './recipes/recipeWrapper/RecipeWrapper';
import { TrainingCreate } from './TrainingSets/trainingCreate/TrainingCreate';
import { CustomTrainings } from './favorite/customTrainings/CustomTrainings';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(selectProfile);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogIn());
      } else {
        dispatch(setLogOut());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const docRef = doc(db, 'users', auth.currentUser?.uid as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const user = docSnap.data() as IUser;
          dispatch(setUserState(user));
        }
      }
    })().catch((error: Error) => error);
  }, [dispatch, isAuth]);

  return (
    <div className={s.app}>
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="food" element={<Food />}>
              <Route path="meal" element={<Meal />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:category" element={<RecipesCategory />} />
              <Route path="recipes/:category/:recipeId" element={<Recipe />} />
            </Route>
            <Route path="workout" element={<Workout />}>
              <Route path="videos" element={<TrainingVideos />} />
              <Route path="videos/:videoCategory" element={<Videos />} />
              <Route path="videos/:videoCategory/:videoId" element={<VideoPage />} />
              <Route path="trainings" element={<TrainingSets />} />
              <Route path="trainings/create" element={<TrainingCreate />} />
              <Route path="trainings/:trainingId" element={<Exercises />} />
              <Route path="trainings/:trainingId/active" element={<TrainingActive />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit-profile" element={<EditProfile />} />
            <Route path="profile/edit-personal-data" element={<EditPersonalData />} />
            <Route path="favorite/video-trainings" element={<FavoriteVideos />} />
            <Route path="favorite/trainings" element={<FavoriteTrainings />} />
            <Route path="favorite/custom-trainings" element={<CustomTrainings />} />
            <Route path="favorite/recipes" element={<FavoriteRecipes />} />
            <Route path="favorite/recipes/:recipeId" element={<RecipeWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Welcome />} />
            <Route path="sign-in" element={<SocialAuthentication />} />
            <Route path="sign-in-with-password" element={<PasswordAuthentication />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="sign-up" element={<RegistrationUserData />} />
            <Route path="sign-up/user-profile" element={<RegistrationUserProfile />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export { App };
