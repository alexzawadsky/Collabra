import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

const NavbarItem = ({
    icon,
    title,
    href,
    className,
    bold,
    markerDisabled,
    end,
    color,
}) => {
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                cn(
                    'flex gap-4 items-center px-3.5 py-3 rounded-md min-h-12 transition-all duration-150 max-w-12 overflow-clip group-hover/navbar:max-w-full justify-start',
                    'before:absolute before:left-3 before:bg-accent-main before:w-1 before:rounded-r-lg before:transition',
                    bold ? 'font-bold' : '',
                    isActive && !markerDisabled
                        ? 'bg-accent-main/5 before:h-6 group-hover/navbar:before:rounded-l-lg'
                        : 'hover:bg-accent-main/[0.03] before:h-0',
                    className
                )
            }
            end={end}
        >
            <span className="text-lg">{icon}</span>
            <p className="block whitespace-nowrap">{title}</p>
        </NavLink>
    )
}

export default NavbarItem
