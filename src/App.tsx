import { useTasks } from "./hooks/useTasks";

import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  const { filteredTasks, itemsLeft, filter, setFilter, addTask, toggleTask, clearCompleted } = useTasks();

  return (
    <div className='app-container'>
      <div className="app">
        <h1 className="app-title">todos</h1>

        <div className="app-main">
          <TaskInput onAdd={addTask} />

          <TaskList tasks={filteredTasks} toggleTask={toggleTask} />

          <Footer filter={filter} setFilter={setFilter} itemsLeft={itemsLeft} clearCompleted={clearCompleted}/>
        </div>
      </div>
    </div>
  );
}

export default App;