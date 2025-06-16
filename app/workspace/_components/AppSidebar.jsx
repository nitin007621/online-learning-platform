'use client'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AddNewCourse from './AddNewCourse'

const SideBarOptions = [
    {
        title : 'Dashboard',
        icon: LayoutDashboard,
        path:"/workspace/"
    },
    {
        title : 'My Learning',
        icon: Book,
        path:"/workspace/my-learning"
    },
    {
        title : 'Explore Courses',
        icon: Compass,
        path:"/workspace/explore"
    },
    {
        title : 'Tools',
        icon: PencilRulerIcon,
        path:"/workspace/ai-tools"
    },
    {
        title : 'Billing',
        icon: WalletCards,
        path:"/workspace/billing"
    },
    {
        title : 'Profile',
        icon: UserCircle2Icon,
        path:"/workspace/profile"
    },

]

function AppSidebar() {

    const path = usePathname();

  return (
     <Sidebar>
        <SidebarHeader>
            <Image src={'./logo.svg'} alt = 'logo' height={150} width={150}/>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <AddNewCourse>
                 <Button>Create New Course</Button>
            </AddNewCourse>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {SideBarOptions.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild className={'p-5'}>
                                <Link href={item.path} className={`text - [17px]
                                    ${path.includes(item.path)&& 'text-primary bg-purple-50'}`}>
                                    <item.icon className='h-7 w-7' />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar