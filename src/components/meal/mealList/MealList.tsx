import React, { FC, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation
} from 'react-beautiful-dnd';
import { useAppSelector } from '../../../store/model';
import { selectUserMeals } from '../../../store/selectors';
import { IDailyMeals } from '../../../store/slices/meals/model';
import { MealCard } from '../mealCard/MealCard';
import { NewMealCard } from '../newMealCard/NewMealCard';
import { meals as defaultMeals } from './constants';
import './MealList.css';

const MealList: FC = () => {
  const [cardsOrder, updateCardsOrder] = useState<IDailyMeals[]>(defaultMeals);

  const userMeals = useAppSelector(selectUserMeals);

  useEffect(() => {
    if (userMeals.length) {
      updateCardsOrder(userMeals);
    }
  }, [userMeals]);

  const handleOnDragEnd = (result: DropResult): void => {
    const cards = Array.from(cardsOrder);
    const [reorderedCards] = cards.splice(result.source.index, 1);
    cards.splice((result.destination as DraggableLocation).index, 0, reorderedCards);
    updateCardsOrder(cards);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list_wrapper" direction="horizontal">
        {(provided) => (
          <div className="list_wrapper" {...provided.droppableProps} ref={provided.innerRef}>
            {cardsOrder.map(({ id, title, meals }, index) => {
              return (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provider) => (
                    <div
                      className="card_wrapper"
                      ref={provider.innerRef}
                      {...provider.draggableProps}
                      {...provider.dragHandleProps}
                    >
                      <MealCard title={title} meals={meals} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            <NewMealCard />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { MealList };
