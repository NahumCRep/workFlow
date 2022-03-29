import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import TeamPage from '../../../components/layouts/TeamPage'
import CustomDroppable from '../../../components/CustomDroppable';
import TaskContainer from '../../../components/tasks/TaskContainer'
import TaskCreateModal from '../../../components/modals/TaskCreateModal'
import TaskModal from '../../../components/modals/TaskModal';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import { get, post } from '../../../api'

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
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const params = useParams()

  const getListSelected = (listID) => {
    const listFiltered = allLists.filter((listItem) => listItem._id === listID)
    // console.log('filtrada', listFiltered)
    setListSelected(...listFiltered)
    setColumns({
      ...columns,
      'NewTsk': {
        name: "Tasks",
        items: listFiltered[0].tasks
      },
    })
  }

  const handleSelectChange = (e) => {
    getListSelected(e.target.value)
  }

  const getLists = () => {
    get("/teams/" + params.id)
      .then(res => {
        setCurrentTeam(res.data)
        setAllLists(res.data.lists)
      })
      .catch(error => console.log(error))
  }

  const refreshTasks = (listId) => {
    get("/teams/" + params.id)
      .then(res => {
        // console.log(res.data)
        setAllLists(res.data.lists)
        setCurrentTeam(res.data)
        const listFiltered = res.data.lists.filter((listItem) => listItem._id === listId)
        setListSelected(...listFiltered)
        setColumns({
          ...columns,
          'NewTsk': {
            name: "Tasks",
            items: listFiltered[0].tasks
          },
        })
      })
      .catch(error => console.log(error))
    console.log('todas las listas', allLists)
    // getListSelected(listId)
  }

  useEffect(() => {
    getLists()
  }, [])

  return (
    <TeamPage>
      <section>
        <div className='w-full h-80 px-4 py-2'>
          <div className='bg-palette-beige h-16 flex items-center px-2'>
            <h1 className='font-righteous text-palette-dark text-xl'>Tasks</h1>
          </div>
          <div className='px-2 font-jost mt-6'>
            <p className='font-bold text-lg'>Select Group</p>
            <select onChange={handleSelectChange} className="w-[200px] h-7 border-2 border-dashed border-palette-dark">
              <option value="" disabled selected>select...</option>
              {allLists.map((listItem) => {
                return (
                  <option key={listItem._id} value={listItem._id}>{listItem.name}</option>
                )
              })}
            </select>
          </div>
          <div className='px-2 mt-6'>
            <p><span className='font-medium'>Name:</span> {listSelected.name}</p>
            <p><span className='font-medium'>Description:</span> {listSelected.description}</p>
          </div>
          <button onClick={() => setCreateModalOpen(true)} className="bg-palette-gray ml-2 mt-4 py-2 px-4" >add task</button>
        </div>
        <div className='w-full h-[500px] grid md:grid-cols-3 justify-items-center px-2 mb-2'>
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
            {
              Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <TaskContainer key={columnId} title={column.name}>
                    <CustomDroppable columnID={columnId} list={column} currentList={listSelected} refreshData={refreshTasks} team={currentTeam} />
                  </TaskContainer>
                )
              })
            }
          </DragDropContext>
        </div>
      </section>
      {createModalOpen && <TaskCreateModal taskModalState={createModalOpen} setModalOpen={setCreateModalOpen} team={currentTeam} currentList={listSelected} refreshData={refreshTasks} />}
    </TeamPage>
  )
}

export default Tasks