import cn from 'classnames'
import { IoPawOutline } from 'react-icons/io5'
import React from 'react'
import { Team } from '../../types'

export interface TeamImageProps {
    team: Partial<Team>
    size?: 'settings' | 'grid' | 'list' | 'board' | (string & {})
    className?: string
}

const TeamImage = ({
    team,
    size,
    className,
}: TeamImageProps): React.ReactElement => {
    let font, w

    switch (size) {
        case 'settings':
            w = 230
            font = 80
            break
        case 'grid':
            w = 140
            font = 36
            break
        case 'list':
            w = 32
            font = 10
            break
        case 'board':
            w = 60
            font = 20
            break
        default:
            w = 16
            font = 16
            break
    }
    return team.image ? (
        <div
            aria-label={`${team.title} image`}
            className={cn('bg-cover bg-center rounded-lg', className)}
            style={{
                width: w,
                height: w,
                minWidth: w,
                minHeight: w,
                maxWidth: w,
                maxHeight: w,
                backgroundImage: `url(${team?.image})`,
            }}
        ></div>
    ) : (
        <p
            className={cn(
                'text-black font-extrabold flex items-center justify-center rounded-lg bg-gradient-radial from-gray-300 to-gray-400/90 dark:from-gray-400 dark:to-gray-600 pointer-events-none select-none',
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
            }}
            aria-label={`${team.title} image`}
        >
            {team.title ? (
                team.title
                    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                    .toUpperCase()
                    .split(' ')
                    .slice(0, 3)
                    .map((part) => part[0])
            ) : (
                <IoPawOutline />
            )}
        </p>
    )
}

export default TeamImage
