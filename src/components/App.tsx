import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebase/firebase';
import { useAppSelector } from '../store/model';
import { useAppDispatch } from '../store/store';
import { selectProfile } from '../store/selectors';
import { setLogIn, setLogOut } from '../store/slices/profileSlice';
import { Home } from '../pages/home/Home';
import { Workout } from '../pages/workout/Workout';
import { Food } from '../pages/food/Food';
import { Profile } from '../pages/profile/Profile';
import { Layout } from './layout/Layout';
import { NotFound } from '../pages/notFound/NotFound';
import { Ration } from './ration/Ration';
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

  return (
    <div className={s.app}>
      <Routes>
        {!isAuth ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="food" element={<Food />}>
              <Route path="ration" element={<Ration />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:category" element={<RecipesCategory />} />
              <Route path="recipes/:category/:recipeId" element={<Recipe />} />
            </Route>
            <Route path="workout" element={<Workout />}>
              <Route path="videos" element={<TrainingVideos />} />
              <Route path="videos/:videoCategory" element={<Videos />} />
              <Route path="videos/:videoCategory/:videoId" element={<VideoPage />} />
              <Route path="trainings" element={<TrainingSets />} />
              <Route path="trainings/:trainingId" element={<Exercises />} />
              <Route path="trainings/:trainingId/active" element={<TrainingActive />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit-profile" element={<EditProfile />} />
            <Route path="profile/edit-personal-data" element={<EditPersonalData />} />
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
