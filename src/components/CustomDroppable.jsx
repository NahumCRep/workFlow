import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskItem from '../components/tasks/TaskItem'
import TaskModal from './modals/TaskModal';


const CustomDroppable = ({ columnID, list, currentList, refreshData, team }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentTask, setCurrentTask] = useState({})
    return (
        <>
            <Droppable droppableId={columnID} key={columnID}>
                {(provided, snapshot) => {
                    return (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`w-full h-full overflow-y-auto overflow-x-hidden p-2 scrollbar scrollbar-thin scrollbar-thumb-palette-lightgreen scrollbar-track-palette-beige ${snapshot.isDraggingOver ? 'bg-palette-gray' : ''}`}
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
                                                    className={`w-[98%] h-auto rounded-lg transition-colors duration-1000 ease-out mt-1 ${snapshot.isDragging ? 'bg-palette-lightgreen' : 'bg-slate-50'}`}
                                                >
                                                    <TaskItem task={item} stateModalFunction={setIsModalOpen} setCurrentTaskFunction={setCurrentTask} />
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
            {
                isModalOpen && <TaskModal taskModalState={isModalOpen} setModalOpen={setIsModalOpen} currentTask={currentTask} list={currentList} refreshTaskPageData={refreshData} currentTeam={team} />
            }
        </>
    )
}

export default CustomDroppable