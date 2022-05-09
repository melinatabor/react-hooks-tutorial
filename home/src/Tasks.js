import React, { useState, useEffect, useReducer } from "react";
import uuid from 'uuid/v4';

const initialTasksState = {
    tasks: [],
    completedTasks: [],
};

const TYPES = {
    ADD_TASK: 'ADD_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    DELETE_TASK: 'DELETE_TASK',
};

// Uso el useReducer en lugar de los multiples useState para agregar, completar y eliminar
const tasksReducer = (state, action) => {
    console.log('state', state, 'action', action);
    switch(action.type) {
        case TYPES.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case TYPES.COMPLETE_TASK:
            const { completedTask } = action;
            return {
                ...state,
                completedTasks: [...state.completedTasks, completedTask],
                tasks: state.tasks.filter(t => t.id !== completedTask.id)
            }
        case TYPES.DELETE_TASK:
            return {
                ...state,
                completedTasks: state.completedTasks.filter(t => t.id !== action.task.id)
            }
        default:
            return state;
    }
    
}

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (taskMap) => {
    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(taskMap)
    );
}

const readStoredTasks = () => {
    const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

    return tasksMap ? tasksMap : initialTasksState;
}

const Tasks = () => {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    // const [tasks, setTasks] = useState(storedTasks.tasks);
    // const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);

    const [state, dispatch] = useReducer(tasksReducer, storedTasks);
    const { tasks, completedTasks } = state;

    useEffect(() => {
        storeTasks({ tasks, completedTasks });
    });

    //  Probar si influye el orden de los hooks
    // let tasks, setTasks, completedTasks, setCompletedTasks;

    // if (i%2 === 0) {
    //     ([tasks, setTasks] = useState([]));
    //     ([completedTasks, setCompletedTasks] = useState([]));
    // } else {
    //     let [foo, setFoo] = useState([]);
    //     let [bar, setBar] = useState([]);
    //     ([completedTasks, setCompletedTasks] = useState([]));
    //     ([tasks, setTasks] = useState([]));
    // }

    // i++;

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        dispatch({ type: TYPES.ADD_TASK, task: {taskText, id:uuid() } });
        // setTasks([...tasks, { taskText, id:uuid() }]);
    }

    const completeTask = completedTask => () => {
        dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
        // setCompletedTasks([...completedTasks, completedTask]);
        // setTasks(tasks.filter(task => task.id !== completedTask.id));
    }

    const deleteTask = task => () => {
        dispatch({ type: TYPES.DELETE_TASK, task });
        // setCompletedTasks(completedTasks.filter(t => t.id !== task.id));
    }

    return (
        <div>
            <h3>Tareas</h3>
            <div className="form">
                <input value={taskText} onChange={updateTaskText} />
                <button onClick={addTask}>Agregar tarea</button>
            </div>
            <div className="task-list">
                {
                    tasks.map(task => {
                        const { id, taskText } = task;

                        return(
                            <div key={id} onClick={completeTask(task)}>
                                {taskText}
                            </div>
                        )

                    })
                }
                <div className="completed-list">
                    {
                        completedTasks.map(task => {
                            const { id, taskText } = task;

                            return (
                                <div key={id}>
                                    {taskText} {' '}
                                    <span onClick={deleteTask(task)} className="delete-task">x</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Tasks;