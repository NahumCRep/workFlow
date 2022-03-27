import { useState } from 'react'
import TeamPage from '../../../components/layouts/TeamPage'
import TaskContainer from '../../../components/tasks/TaskContainer'
import TaskItem from '../../../components/tasks/TaskItem';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';


const tasklist = [
  {
    id: 'task1',
    task: 'task 1 probando',
    state: 'new'
  },
  {
    id: 'task2',
    task: 'task 2 probando',
    state: 'new'
  },
  {
    id: 'task3',
    task: 'task 3 probando',
    state: 'new'
  },
  {
    id: 'task4',
    task: 'task 4 probando',
    state: 'new'
  },
  {
    id: 'task5',
    task: 'task 5 probando',
    state: 'new'
  },
  {
    id: 'task6',
    task: 'task 6 probando',
    state: 'new'
  },
  {
    id: 'task7',
    task: 'task 7 probando',
    state: 'new'
  },
  {
    id: 'task8',
    task: 'task 8 probando',
    state: 'new'
  },
  {
    id: 'task9',
    task: 'task 9 probando',
    state: 'new'
  }
]

const stateColumns = {
  [uuid()]: {
    name: "Tasks",
    items: tasklist
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Waiting for Approval",
    items: []
  }
};



const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const Tasks = () => {
  const [columns, setColumns] = useState(stateColumns);

  return (
    <TeamPage>
      <section>
        <div className='w-full h-80 bg-slate-500'>

        </div>
        <div className='w-full h-[500px] grid md:grid-cols-3 gap-2 justify-items-center px-4'>
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
            {
              Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <TaskContainer key={columnId} title={column.name}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`w-full h-full overflow-y-auto overflow-x-hidden p-2 scrollbar scrollbar-thin scrollbar-thumb-palette-lightgreen scrollbar-track-palette-beige ${snapshot.isDraggingOver ? 'bg-palette-dark':''}`}
                          >
                            {
                              column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {
                                      (provided, snapshot) => {
                                        return(
                                          <div 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`w-[98%] h-11 rounded-lg transition-colors duration-1000 ease-out mt-1 ${snapshot.isDragging ? 'bg-palette-lightgreen':'bg-slate-50'}`}
                                          >
                                            <h1>{item.task}</h1>
                                          </div>
                                        )
                                      }
                                    }
                                  </Draggable>
                                )
                              })
                            }
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </TaskContainer>
                )
              })
            }
          </DragDropContext>
        </div>
      </section>
    </TeamPage>
  )
}

export default Tasks