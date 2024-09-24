import cn from 'classnames'
import React from 'react'

export interface GeneratedAvatarProps {
    firstName: string
    lastName: string
    startColor: string
    endColor: string
    size?:
        | 'sidebar'
        | 'profile'
        | 'settings'
        | 'task'
        | 'assigneeOption'
        | string
    square?: boolean
    style: { string: any } | undefined
    className?: string
    w: number
}

const GeneratedAvatar = ({
    firstName,
    lastName,
    startColor,
    endColor,
    size,
    square,
    style,
    className,
    w,
}: GeneratedAvatarProps): React.ReactElement => {
    let font

    switch (size) {
        case 'sidebar':
            font = 16
            break
        case 'profile':
            font = 60
            break
        case 'settings':
            font = 80
            break
        case 'task':
            font = 12
            break
        case 'assigneeOption':
            font = 10
            break
        default:
            font = 16
            break
    }
    return (
        <div
            className={cn(
                `rounded-full flex items-center justify-center font-extrabold text-black pointer-events-none select-none`,
                square ? 'rounded-xl' : 'rounded-full',
                className
            )}
            style={{
                fontSize: font,
                width: w,
                height: w,
                minWidth: w,
                minHeight: w,
                maxWidth: w,
                maxHeight: w,
                background: `linear-gradient(90deg, #${startColor} 0%, #${endColor} 100%)`,
                ...style,
            }}
        >
            {firstName && firstName[0]}
            {lastName && lastName[0]}
        </div>
    )
}

export default GeneratedAvatar
