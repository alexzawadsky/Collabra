import useLocalStorage from '../../../../hooks/useLocalStorage'
import Board from './Board/Board'
import List from './List/List'

const TasksContainer = () => {
    const [viewOption, setViewOption] = useLocalStorage(
        'tasksViewOption',
        'board'
    )

    switch (viewOption) {
        case 'board':
            return <Board />
        case 'list':
            return <List />
        default:
            return 'unknown tasks layout'
    }
}

export default TasksContainer
