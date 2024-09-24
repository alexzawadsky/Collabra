import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { IoPeopleOutline, IoLogInOutline } from 'react-icons/io5'
import NavbarItem from './NavbarItem'
import logo from '../../assets/images/logo.png'
import TeamSpaceControls from './TeamSpaceControls'
import AuthContext, { IAuthContext } from '../../contexts/AuthContext.js'
import UserProfileLink from './UserProfileLink'
import { Button, Divider, Spacer } from '../'
import ThemePicker from './ThemePicker'
import LanguagePicker from './LanguagePicker'
import useScreenSize from '../../hooks/useScreenSize.js'
import { CgMenuGridO } from 'react-icons/cg'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (): React.ReactElement => {
    const { t } = useTranslation()
    const { user } = useContext(AuthContext) as IAuthContext
    const [open, setOpen] = useState<boolean>(false)
    const { isTablet } = useScreenSize()
    const location = useLocation()
    const navbarRef = useRef<HTMLElement>(null)

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        },
        [navbarRef]
    )

    const handleScroll = useCallback(() => setOpen(false), [setOpen])

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        setOpen(false)
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <nav
            className={cn(
                'navbar-area grid w-fit max-w-full hover:md:max-w-[300px] md:max-w-nav max-md:w-full grid-cols-[1fr_1fr] md:flex flex-col gap-3 p-3 hover:md:px-5 md:h-full fixed z-[999] bg-white dark:bg-slate-800 top-0 group/navbar transition-all shadow-md hover:md:shadow-xl outline-1 duration-150 overflow-x-hidden overflow-y-hidden md:overflow-y-auto',
                open ? 'max-md:max-h-full' : 'max-md:max-h-nav'
            )}
            ref={navbarRef}
        >
            <div className="flex gap-2 col-span-full items-center">
                {!isTablet && (
                    <Button
                        className="w-12 h-12 text-2xl"
                        action={() => setOpen((prevState) => !prevState)}
                    >
                        <CgMenuGridO />
                    </Button>
                )}
                <NavbarItem
                    href="/"
                    className="!bg-transparent !hover:bg-transparent !p-0 !group-hover/navbar:pr-3 !pl-1 text-xl w-fit md:w-full max-md:gap-2"
                    icon={
                        <img
                            alt="Collabra logo"
                            src={logo}
                            width={40}
                            height={40}
                            className="min-w-10 dark:invert"
                        />
                    }
                    title="Collabra"
                    bold
                    markerDisabled
                    end
                />
                {!isTablet ? (
                    user ? (
                        <UserProfileLink />
                    ) : (
                        <Link
                            to="/login"
                            className="ml-auto p-2 text-lg text-accent dark:text-accent-dark"
                        >
                            {t('login')}
                        </Link>
                    )
                ) : null}
            </div>
            {isTablet && <Divider horizontal />}
            {user && (
                <NavbarItem
                    href="/teams"
                    icon={<IoPeopleOutline />}
                    title={t('teams')}
                    end
                />
            )}
            <TeamSpaceControls />
            {isTablet && <Spacer />}
            <Divider horizontal />
            <LanguagePicker />
            <ThemePicker />
            {isTablet &&
                (user ? (
                    <UserProfileLink />
                ) : (
                    <NavbarItem
                        href="/login"
                        icon={<IoLogInOutline />}
                        title={t('login')}
                    />
                ))}
        </nav>
    )
}

export default Navbar
