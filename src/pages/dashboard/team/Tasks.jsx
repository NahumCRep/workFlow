import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import TeamPage from '../../../components/layouts/TeamPage'
import CustomDroppable from '../../../components/CustomDroppable';
import TaskContainer from '../../../components/tasks/TaskContainer'
import TaskCreateModal from '../../../components/modals/TaskCreateModal'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import { get, post } from '../../../api'


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
  const [columns, setColumns] = useState({
    'NewTsk': {
      name: "Tasks",
      items: []
    },
    'ProgTsk': {
      name: "In Progress",
      items: []
    },
    'WaitTsk': {
      name: "Waiting for Approval",
      items: []
    }
  });
  const [allLists, setAllLists] = useState([])
  const [listSelected, setListSelected] = useState({})
  const [currentTeam, setCurrentTeam] = useState({})
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const params = useParams()

  const getListSelected = (e) => {
    const listFiltered = allLists.filter((listItem) => listItem._id === e.target.value)
    setListSelected(...listFiltered)
    setColumns({
      ...columns,
      'NewTsk': {
        name: "Tasks",
        items: listFiltered[0].tasks
      },
    })
    console.log('lista seleccionada', listFiltered)
  }

  const getTasks = () => {
    setColumns({
      ...columns,
      'NewTsk': {
        name: "Tasks",
        items: listSelected.tasks
      },
    })
    console.log(columns)
  }

  const addTask = () => {
    post(`lists/${listSelected._id}/addTask`,{})
    .then(res => console.log(res.data))
    .catch(error => console.log(error))
  }

  const getLists = () => {
    get("/teams/" + params.id)
      .then(res => {
        console.log(res.data)
        setCurrentTeam(res.data)
        setAllLists(res.data.lists)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getLists()
  }, [])

  return (
    <TeamPage>
      <section>
        <div className='w-full h-80 bg-slate-500 px-4 py-2'>
          <div className='bg-palette-beige h-16 flex items-center px-2'>
            <h1 className='font-righteous text-palette-dark text-xl'>Tasks</h1>
          </div>
          <div>
            <p>Select Group</p>
            <select onChange={getListSelected}>
              <option value="" disabled selected>select...</option>
              {allLists.map((listItem) => {
                return (
                  <option key={listItem._id} value={listItem._id}>{listItem.name}</option>
                )
              })}
            </select>
          </div>
          <div>
            <p>Name: {listSelected.name}</p>
            <p>Description: {listSelected.description}</p>
          </div>
          <button onClick={() => setCreateModalOpen(true)}>add task</button>
        </div>
        <div className='w-full h-[500px] grid md:grid-cols-3 gap-2 justify-items-center px-4'>
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
            {
              Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <TaskContainer key={columnId} title={column.name}>
                    <CustomDroppable columnID={columnId} list={column} />
                  </TaskContainer>
                )
              })
            }
          </DragDropContext>
        </div>
      </section>
      {
        createModalOpen && <TaskCreateModal taskModalState={createModalOpen} setModalOpen={setCreateModalOpen} team={currentTeam} currentList={listSelected} />
      }
    </TeamPage>
  )
}

export default Tasks