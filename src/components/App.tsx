import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.css';
import { Home } from '../pages/home/Home';
import { Workout } from '../pages/workout/Workout';
import { Food } from '../pages/food/Food';
import { Profile } from '../pages/profile/Profile';
import { Layout } from './layout/Layout';
import { NotFound } from '../pages/notFound/NotFound';
import { Ration } from './ration/Ration';
import { Recipes } from './recipes/Recipes';
import { TrainingSets } from './TrainingSets/TrainingSets';
import { TrainingVideos } from './TrainingVideos/TrainingVideos';
import { Exercises } from './TrainingSets/exercises/Exercises';
import { TrainingActive } from './TrainingSets/trainingActive/TrainingActive';
import { Recipe } from './recipes/recipe/Recipe';

const App: FC = () => {
  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="food" element={<Food />}>
            <Route path="ration" element={<Ration />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="recipes/:recipeId" element={<Recipe />} />
          </Route>
          <Route path="workout" element={<Workout />}>
            <Route path="videos" element={<TrainingVideos />} />
            <Route path="trainings" element={<TrainingSets />} />
            <Route path="trainings/:trainingId" element={<Exercises />} />
            <Route path="trainings/:trainingId/active" element={<TrainingActive />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export { App };
