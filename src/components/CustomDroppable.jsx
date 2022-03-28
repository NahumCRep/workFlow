import React from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const CustomDroppable = ({columnID, list}) => {
    return (
        <Droppable droppableId={columnID} key={columnID}>
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`w-full h-full overflow-y-auto overflow-x-hidden p-2 scrollbar scrollbar-thin scrollbar-thumb-palette-lightgreen scrollbar-track-palette-beige ${snapshot.isDraggingOver ? 'bg-palette-dark' : ''}`}
                    >
                        {list?.items?.map((item, index) => {
                            return (
                                <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={index}
                                >
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`w-[98%] h-11 rounded-lg transition-colors duration-1000 ease-out mt-1 ${snapshot.isDragging ? 'bg-palette-lightgreen' : 'bg-slate-50'}`}
                                            >
                                                <h1>{item.name}</h1>
                                            </div>
                                        )
                                    }}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )
}

export default CustomDroppable