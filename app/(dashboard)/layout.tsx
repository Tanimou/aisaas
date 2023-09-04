import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getApiLimitCount } from '@/lib/apilimit'
import { checkSubscription } from '@/lib/subscription'
import { FC, ReactNode } from 'react'

interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({ children }) => {
    const apiLimitCount = await getApiLimitCount()
    const isPro = await checkSubscription()
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </div>
            <main className="md:pl-72 pb-10">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout