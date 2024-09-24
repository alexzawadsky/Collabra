import { Member } from '../../../../types'
import React, { SetStateAction, useContext } from 'react'
import { Avatar, Dropdown } from '../../../../components'
import { useTeamMembers } from '../../../../api/team'
import TeamContext, { ITeamContext } from '../../../../contexts/TeamContext'
import { useTranslation } from 'react-i18next'

interface AssigneeSelectorProps {
    assignee: number | undefined | null
    setAssignee: React.Dispatch<SetStateAction<number | undefined | null>>
}

const AssigneeSelector = ({ assignee, setAssignee }: AssigneeSelectorProps) => {
    const { t } = useTranslation()
    const { team } = useContext(TeamContext) as ITeamContext
    const { data } = useTeamMembers(team?.id!, {})
    if (!data) return

    const membersDict: Record<string, Member> = data?.members.reduce(
        (acc, member) => {
            acc[member.id] = member
            return acc
        },
        {} as Record<string, Member>
    )

    return (
        <Dropdown<Member>
            values={membersDict}
            renderOption={(member) => (
                <li key={member.id} className="flex gap-3 items-center w-full">
                    {member.user.first_name} {member.user.last_name}{' '}
                    <Avatar
                        user={member.user}
                        size="assigneeOption"
                        className="ml-auto"
                    />
                </li>
            )}
            renderSelected={(member) => (
                <span className="flex gap-3">
                    <Avatar user={member.user} size="assigneeOption" />
                    {member.user.first_name} {member.user.last_name}{' '}
                    <p className="text-accent dark:text-accent-dark hover:opacity-80 font-semibold inline ml-2">
                        {t('change')}
                    </p>
                </span>
            )}
            selected={assignee}
            setSelected={
                setAssignee as React.Dispatch<
                    SetStateAction<string | number | null | undefined>
                >
            }
            openTop
            notSelectedPlaceholder={
                <p className="text-accent dark:text-accent-dark font-semibold">
                    {t('select_assignee')}
                </p>
            }
        />
    )
}

export default AssigneeSelector
