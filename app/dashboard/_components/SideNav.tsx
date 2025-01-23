"use client"
import React, { useEffect ,useState} from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link';



function SideNav() {
    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'Setting',
            icon: Settings,
            path: '/dashboard/setting'
        },
    ]

    const path = usePathname();

    useEffect(() => {
        console.log("path")
    }, [])

    return (
        <div className='h-screen p-5 relative shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src={'/logo.svg'} alt='logo' width={100} height={100} />
            </div>
            <hr className='my-6 border' />
            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <Link href={menu.path}>
                    <div 
                        key={menu.path}  // <-- Add key prop here
                        className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center
                            ${path == menu.path && 'bg-primary text-white'}
                            `}>
                        <menu.icon className='h-7 w-6' />
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
            <div className='absolute bottom-10 left-0 w-full'>
            <UsageTrack/>
            </div>
        </div>
    )
}

export default SideNav
