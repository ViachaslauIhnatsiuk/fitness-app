import React, { FC, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation
} from 'react-beautiful-dnd';
import { MealCard } from '../mealCard/MealCard';
import { mealsTitles } from './constants';
import './MealList.css';

const MealList: FC = () => {
  const [cardsOrder, updateCardsOrder] = useState<{ id: number; title: string }[]>(mealsTitles);

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
            {cardsOrder.map(({ title, id }, index) => {
              return (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provider) => (
                    <div
                      ref={provider.innerRef}
                      {...provider.draggableProps}
                      {...provider.dragHandleProps}
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
