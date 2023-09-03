
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Replicate from "replicate"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
})

// const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
    try {
        // const { userId } :{userId:string|null}= auth()
        const body = await req.json()
        const { prompt } = body

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 })
        // }

        if (!replicate.auth) {
            return new NextResponse("REPLICATE API KEY NOT CONFIGURED", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("Prompt not provided", { status: 400 })
        }

        const response = await replicate.run(
            "nightmareai/cogvideo:00b1c7885c5f1d44b51bcb56c378abc8f141eeacf94c1e64998606515fe63a8d",
            {
                input: {
                    prompt: prompt
                }
            }
        );

        return NextResponse.json(response)
    } catch (error) {
        console.error("VIDEO_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}