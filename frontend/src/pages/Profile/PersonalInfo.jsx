import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateUser, useUser } from '../../api/user'
import { Avatar, Button, Form, Input } from '../../components'
import useInput from '../../hooks/useInput'
import { Link } from 'react-router-dom'
import { IoArrowForward, IoCheckmarkSharp } from 'react-icons/io5'
import { objectsDifference } from '../../utils'
import LinkCell from './LinkCell'
import TimezoneSelect from 'react-timezone-select'
import cn from 'classnames'

const PersonalInfo = () => {
    const { t } = useTranslation()
    const { data, isLoading } = useUser('me')
    const firstName = useInput(data?.first_name, { isEmpty: true })
    const lastName = useInput('', { isEmpty: true })
    const email = useInput('', { isEmpty: true })
    const username = useInput('', { isEmpty: true })
    const newLink = useInput('')
    const [hasChanges, setHasChanges] = useState(false)
    const [selectedTimezone, setSelectedTimezone] = useState('')
    const [timezoneValue, setTimezoneValue] = useState('')
    const [links, setLinks] = useState([])
    const { mutate: updateUser, isLoading: mutationLoading } = useUpdateUser()

    const formData = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        username: username.value,
        timezone: timezoneValue,
        links: links,
    }

    useEffect(() => {
        if (!data) return
        firstName.setValue(data.first_name)
        lastName.setValue(data.last_name)
        email.setValue(data.email)
        username.setValue(data.username)
        setTimezoneValue(data.timezone)
        setLinks([...data.links])
    }, [data])

    useEffect(() => {
        if (selectedTimezone) setTimezoneValue(selectedTimezone.value)
    }, [selectedTimezone])

    useEffect(() => {
        setHasChanges(
            Object.keys(objectsDifference(data, formData)).length !== 0
        )
    }, [formData, JSON.stringify(links)])

    return (
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
            <div className="flex flex-col gap-3">
                <p className="font-bold text-3xl">{t('personal_info_head')}</p>
                <p className="text-gray-600 dark:text-gray-400">
                    {t('personal_info_desc')}
                </p>
                <Link
                    to="/users/me"
                    className="text-accent dark:text-accent-dark font-semibold text-lg flex items-center gap-3 hover:gap-5 transition-all w-fit"
                >
                    {t('view_profile')}
                    <IoArrowForward />
                </Link>
            </div>
            {!isLoading && (
                <div className="flex flex-col gap-10 max-w-xl">
                    <div className="flex gap-5 md:gap-10 items-center">
                        <Avatar user={data} size="profile" square />
                        <div>
                            <Button style="secondary">
                                {t('change_avatar')}
                            </Button>
                            <p className="pt-3 font-semibold text-sm text-gray-600 dark:text-gray-400">
                                JPG, PNG {t('or')} GIF
                            </p>
                        </div>
                    </div>
                    <Form
                        className="!gap-7 md:!gap-10"
                        disabled={
                            !hasChanges ||
                            [firstName, lastName, email, username].some(
                                (field) => !field.allValid
                            )
                        }
                        onSubmit={() => {
                            updateUser(objectsDifference(data, formData))
                        }}
                    >
                        <div className="grid md:grid-cols-[1fr_1fr] gap-7 md:gap-5">
                            <Input
                                title={t('first_name')}
                                instance={firstName}
                                must
                            />
                            <Input
                                title={t('last_name')}
                                instance={lastName}
                                must
                            />
                        </div>
                        <Input
                            title={t('email')}
                            instance={email}
                            type="email"
                            must
                        />
                        <Input
                            title={t('username')}
                            instance={username}
                            prefix="@"
                            must
                        />
                        <div className="flex flex-col gap-1">
                            <p className="pl-1">{t('timezone')}</p>
                            <TimezoneSelect
                                value={timezoneValue}
                                onChange={setSelectedTimezone}
                                classNames={{
                                    control: (state) =>
                                        cn(
                                            state.isFocused
                                                ? 'ring-1 ring-accent dark:ring-accent-dark !shadow-none'
                                                : '',
                                            '!min-h-10 !border-none !bg-slate-100 dark:!bg-slate-600'
                                        ),
                                    singleValue: () => 'dark:!text-white',
                                    menu: () =>
                                        '!bg-slate-100 dark:!bg-slate-600 !border-accent dark:!border-accent-dark',
                                    option: (state) =>
                                        cn(
                                            state.isSelected
                                                ? '!bg-accent dark:!bg-accent-dark'
                                                : 'hover:!bg-accent/20 dark:hover:!bg-accent-dark/20',
                                            ''
                                        ),
                                }}
                            />
                            <Button
                                type="button"
                                className="text-accent hover:text-accent/90 dark:text-accent-dark dark:hover:text-accent-dark/90 pl-1"
                                action={() =>
                                    setTimezoneValue(
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone
                                    )
                                }
                            >
                                {t('select_auto_time')}
                            </Button>
                        </div>
                        <div>
                            <p className="pl-1">{t('links')}</p>
                            <ul
                                className="flex gap-5 flex-col"
                                key={links.length}
                            >
                                {links.map((_, key) => (
                                    <LinkCell
                                        links={links}
                                        index={key}
                                        key={key}
                                        setLinks={setLinks}
                                    />
                                ))}
                                <div className="flex gap-5 items-center">
                                    <Input instance={newLink} />
                                    <Button
                                        style="secondary"
                                        className="min-w-10 !min-h-10 !p-0"
                                        action={() => {
                                            if (newLink.value === '') return
                                            setLinks((links) => [
                                                ...links,
                                                newLink.value,
                                            ])
                                            newLink.setValue('')
                                        }}
                                        type="button"
                                    >
                                        <IoCheckmarkSharp />
                                    </Button>
                                </div>
                            </ul>
                        </div>
                        {mutationLoading && 'loading'}
                        <Button
                            style="primary"
                            type="submit"
                            disabled={mutationLoading}
                        >
                            {mutationLoading ? t('loading') : t('save')}
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    )
}

export default PersonalInfo
