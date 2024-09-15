import { Step, Task } from '../../../../../types'
import {
    IoChatboxEllipsesOutline,
    IoCheckmark,
    IoCheckmarkDoneOutline,
    IoChevronDown,
    IoDocumentAttachOutline,
    IoEllipsisVerticalSharp,
} from 'react-icons/io5'
import { Avatar, Checkbox, MembersAvatars } from '../../../../../components'
import { useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import TaskTag from '../TaskTag'
import TaskStats from '../TaskStats'
import TaskSteps from '../TaskSteps'
import TaskMenu from '../TaskMenu'
import useProfilePath from '../../../../../hooks/useProfilePath'

interface CardProps {
    task: Task
    view: string
}

const StepsProgress = ({
    task,
    parentOpen,
}: {
    task: Task
    parentOpen: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [doneCount, setDoneCount] = useState(
        task.steps.filter((step) => step.is_done).length
    )

    if (task.steps.length === 0) return

    return (
        <div>
            <span
                className={cn(
                    'hover:cursor-pointer rounded-md mt-3 py-1 pl-2 pr-3 border dark:border-gray-500 text-gray-400 dark:text-gray-500 flex items-center font-semibold gap-2 w-fit transition-all duration-75',
                    doneCount === task.steps.length
                        ? 'bg-gray-100 dark:bg-slate-700'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <IoCheckmarkDoneOutline size="1.2em" />
                {doneCount}/{task.steps.length}
            </span>
            <div
                className={cn(
                    'transition-all duration-200',
                    isOpen ? 'pt-4' : 'pt-0'
                )}
            >
                <TaskSteps
                    taskId={task.id}
                    disabled={task.status === 'done'}
                    steps={task.steps}
                    setDoneCounter={setDoneCount}
                    isOpen={isOpen && parentOpen}
                />
            </div>
        </div>
    )
}

const TaskCard = ({ task }: CardProps) => {
    const [isOpen, setIsOpen] = useState(task.status !== 'done')
    return (
        <li className="bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <div
                className={cn(
                    'flex items-center transition-all duration-200 px-4',
                    isOpen
                        ? 'max-h-52 pt-4 opacity-100'
                        : 'max-h-0 pt-0 opacity-0'
                )}
            >
                <TaskTag tag={task.tag} />
                <span className="ml-auto">
                    <TaskMenu task={task} />
                </span>
            </div>
            <div
                className={cn(
                    'flex items-center gap-2 p-4',
                    task.status === 'done' ? 'hover:cursor-pointer' : null
                )}
                onClick={() =>
                    task.status === 'done' && setIsOpen((prev) => !prev)
                }
            >
                {task.status === 'done' && (
                    <span className="text-green-600 text-lg">
                        <IoCheckmark />
                    </span>
                )}
                <Link
                    to={`${task.id}`}
                    className="font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline"
                >
                    {task.title}
                </Link>
                <span
                    className={cn(
                        'text-xl p-2 transition-all duration-200 ml-auto',
                        isOpen ? 'rotate-180' : null,
                        task.status !== 'done' ? 'hidden' : null
                    )}
                >
                    <IoChevronDown />
                </span>
            </div>
            <div
                className={cn(
                    'px-4 grid overflow-hidden transition-all duration-200',
                    isOpen
                        ? 'pb-4 max-h-[1000px] border-b dark:border-b-slate-700 opacity-100'
                        : 'pb-0 max-h-0 border-0 opacity-0'
                )}
            >
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                    {task.description}
                </p>
                <StepsProgress task={task} parentOpen={isOpen} />
            </div>
            <div
                className={cn(
                    'px-4 flex items-center gap-3.5 overflow-hidden transition-all duration-200',
                    isOpen
                        ? 'max-h-52 py-4 opacity-100'
                        : 'max-h-0 py-0 opacity-0'
                )}
            >
                <Link
                    to={useProfilePath(task.assignee.user.id)}
                    className="flex items-center gap-3 font-semibold text-gray-600 dark:text-gray-400 mr-auto"
                >
                    <Avatar user={task.assignee.user} />
                    {task.assignee.user.first_name}
                </Link>
                <TaskStats task={task} />
            </div>
        </li>
    )
}

export default TaskCard
