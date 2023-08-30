"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const tools = [
    {
        label: "Chat with AI",
        href: "/conversation",
        bgColor: "bg-violet-100",
        color: "text-violet-700",
        icon: MessageSquare
    },
    {
        label: "Generate AI Images",
        href: "/image",
        bgColor: "bg-pink-100",
        color: "text-pink-700",
        icon: ImageIcon
    },
    {
        label: "Create AI Videos",
        href: "/video",
        bgColor: "bg-orange-100",
        color: "text-orange-700",
        icon: VideoIcon
    },
    {
        label: "Discover AI Music",
        href: "/musique",
        bgColor: "bg-emerald-100",
        color: "text-emerald-700",
        icon: Music
    },
    {
        label: "Be productive with AI Code",
        href: "/code",
        bgColor: "bg-green-100",
        color: "text-green-700",
        icon: Code
    },

]
export default function DashboardPage() {
    const router = useRouter()
    return (

        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card  key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer" onClick={() => router.push(tool.href)}>
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 hover:translate-x-2 duration-300" />
                    </Card>
                ))}
            </div>
        </div>
    )
}
