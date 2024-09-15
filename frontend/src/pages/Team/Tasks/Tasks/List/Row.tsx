import { Task } from '../../../../../types'
import { Link } from 'react-router-dom'
import TaskTag from '../TaskTag'
import TaskStats from '../TaskStats'
import { Avatar } from '../../../../../components'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import TaskMenu from '../TaskMenu'
import { getStatusColor } from '../../../../../utils'
import useProfilePath from '../../../../../hooks/useProfilePath'

const TaskRow = ({ task }: { task: Task }) => {
    const { t } = useTranslation()

    return (
        <li className="grid lg:grid-cols-[2fr_2fr] odd:bg-gray-50 bg-gray-100 odd:dark:bg-slate-800 dark:bg-slate-900 px-5 py-4 gap-4 xl:gap-10 first:rounded-t-lg last:rounded-b-lg">
            <div className="grid md:grid-cols-[130px_1fr] place-items-center justify-items-start gap-3">
                <TaskTag tag={task.tag} />
                <Link
                    to={`${task.id}`}
                    className="max-md:col-span-full font-semibold text-lg line-clamp-2 hover:text-accent dark:hover:text-accent-dark hover:underline w-fit"
                >
                    {task.title}
                </Link>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_40px]">
                <div className="flex items-center gap-3">
                    <span
                        className={cn('size-4 rounded-full inline-block')}
                        style={{
                            backgroundColor: getStatusColor(task.status),
                        }}
                    ></span>
                    {t(task.status)}
                </div>
                <Link
                    to={useProfilePath(task.assignee.user.id)}
                    className="flex items-center gap-3 w-fit"
                >
                    <Avatar user={task.assignee.user} />
                    {task.assignee.user.first_name}
                </Link>
                <TaskStats task={task} />
                <TaskMenu task={task} />
            </div>
        </li>
    )
}

export default TaskRow
