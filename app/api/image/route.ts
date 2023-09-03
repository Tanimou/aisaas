
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { increaseApiLimit, checkApiLimit } from '@/lib/apilimit'


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
    try {
        const { userId } :{userId:string|null}= auth()
        const body = await req.json()
        const { prompt,amount=1,resolution="256x256" } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai.apiKey) {
            return new NextResponse("OPENAI API KEY NOT CONFIGURED", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("Prompt not provided", { status: 400 })
        }
        if (!amount) {
            return new NextResponse("Amount not provided", { status: 400 })
        }
        if (!resolution) {
            return new NextResponse("Resolution not provided", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        if (!freeTrial) {
            return new NextResponse("Free trial limit reached", { status: 403 })
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size:resolution
        })

        await increaseApiLimit()

        return NextResponse.json(response.data)
    } catch (error) {
        console.error("IMAGE_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}