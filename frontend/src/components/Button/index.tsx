import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React from 'react'

export interface ButtonProps {
    style?: 'primary' | 'secondary' | 'tertiary' | 'destructive'
    children: React.ReactNode
    className?: string
    type?: 'submit' | 'reset' | 'button'
    w_full?: boolean
    disabled?: boolean
    to?: string
    isLoading?: boolean
    loadingText?: React.ReactNode
    action?(): void
    target?: string
}

const Button = ({
    style,
    action,
    children,
    className,
    type,
    w_full,
    disabled,
    to,
    isLoading,
    loadingText,
    target,
}: ButtonProps): React.ReactElement => {
    const { t } = useTranslation()

    const componentProps = {
        className: cn(
            'flex items-center focus-visible:ring-accent focus-visible:dark:ring-accent-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none justify-center gap-3 transition-all duration-75 active:hover:opacity-80 h-fit whitespace-nowrap',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:dark:bg-slate-800 disabled:dark:border-slate-500 disabled:!text-slate-500 disabled:dark:!text-slate-400',
            style === 'primary'
                ? 'bg-accent dark:bg-accent-dark border-accent dark:border-accent-dark text-white font-bold hover:bg-accent/90 dark:hover:bg-accent-dark/90'
                : '',
            style === 'secondary'
                ? 'border-accent border-2 dark:border-accent-dark text-accent hover:bg-accent/5 dark:text-accent-dark dark:hover:bg-accent-dark/5'
                : '',
            style === 'tertiary' ? 'text-slate-600 dark:text-slate-400' : '',
            style === 'destructive'
                ? 'bg-red-600 dark:bg-red-800 border-red-600 text-white font-bold hover:bg-red-700 dark:hover:bg-red-900 hover:border-red-700'
                : '',
            ['primary', 'secondary', 'destructive'].includes(style as string)
                ? 'px-4 min-h-10 rounded-md'
                : 'hover:opacity-80',
            w_full ? 'w-full' : 'w-fit',
            className
        ),
        type: type,
        disabled: disabled || isLoading,
    }

    const content = isLoading
        ? loadingText
            ? loadingText
            : t('loading')
        : children

    return to ? (
        <Link to={to} {...componentProps} target={target}>
            {content}
        </Link>
    ) : (
        <button {...componentProps} onClick={() => action && action()}>
            {content}
        </button>
    )
}

export default Button
