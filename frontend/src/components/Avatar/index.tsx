import cn from 'classnames'
import GeneratedAvatar from './GeneratedAvatar'
import React from 'react'
import { User } from '../../types'

export interface AvatarProps {
    className?: string
    size?:
        | 'sidebar'
        | 'profile'
        | 'settings'
        | 'task'
        | 'assigneeOption'
        | string
    square?: boolean
    style?: { string: any }
    user: User
}

const Avatar = ({
    className,
    user,
    size,
    square,
    style,
}: AvatarProps): React.ReactElement | undefined => {
    if (!user) return
    let w
    switch (size) {
        case 'sidebar':
            w = 36
            break
        case 'profile':
            w = 150
            break
        case 'settings':
            w = 230
            break
        case 'task':
            w = 30
            break
        case 'assigneeOption':
            w = 24
            break
        default:
            w = 36
            break
    }

    if (user.avatar) {
        return (
            <div
                className={cn(
                    'bg-cover bg-center',
                    square ? 'rounded-xl' : 'rounded-full',
                    className
                )}
                style={{
                    backgroundImage: `url(${user.avatar})`,
                    width: w,
                    height: w,
                    minWidth: w,
                    minHeight: w,
                    maxWidth: w,
                    maxHeight: w,
                    ...style,
                }}
            />
        )
    }

    return (
        <GeneratedAvatar
            firstName={user.first_name}
            lastName={user.last_name}
            startColor={user.generated_avatar.first_color || '999999'}
            endColor={user.generated_avatar.second_color || '999999'}
            size={size}
            w={w}
            square={square}
            style={style}
            className={className}
        />
    )
}

export default Avatar
