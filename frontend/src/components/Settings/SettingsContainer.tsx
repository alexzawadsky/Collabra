import React from 'react'

const SettingsContainer = ({
    children,
}: {
    children: React.ReactNode
}): React.ReactElement => {
    return (
        <div className="container mx-auto flex flex-col gap-10 md:gap-16 my-10 md:my-16 divide-y divide-accent/30 dark:divide-accent-dark/50 px-5">
            {children}
        </div>
    )
}

export default SettingsContainer
