import React, { FC, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation
} from 'react-beautiful-dnd';
import { MealCard } from '../mealCard/MealCard';
import { MealCardProps } from '../mealCard/models';
import { mealsTitles } from './constants';
import './MealList.css';

const MealList: FC = () => {
  const [cardsOrder, updateCardsOrder] = useState<MealCardProps[]>(mealsTitles);

  const handleonDragEnd = (result: DropResult): void => {
    const cards = Array.from(cardsOrder);
    const [reorderedCards] = cards.splice(result.source.index, 1);
    cards.splice((result.destination as DraggableLocation).index, 0, reorderedCards);
    updateCardsOrder(cards);
  };

  return (
    <DragDropContext onDragEnd={handleonDragEnd}>
      <Droppable droppableId="card_wrapper" direction="horizontal">
        {(provided) => (
          <div className="list_wrapper" {...provided.droppableProps} ref={provided.innerRef}>
            {mealsTitles.map(({ title, id }, index) => {
              return (
                <Draggable key={id} draggableId={(id as number).toString()} index={index}>
                  {(provided2) => (
                    <div
                      ref={provided2.innerRef}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                    >
                      <MealCard title={title} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { MealList };
