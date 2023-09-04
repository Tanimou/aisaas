import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"

const settingUrl = absoluteUrl("/settings")

export async function GET() {
    try {

        const { userId } = auth()
        const user = await currentUser()

        if (!userId || !user) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingUrl
            })
            return new NextResponse(JSON.stringify({url: stripeSession.url}), {status: 200})
        }

        const stripeSession = await stripe.checkout.sessions.create({
            customer_email: user.emailAddresses[0].emailAddress,
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "GENIUS PRO",
                            description: "Genius Pro Subscription",
                        },
                        unit_amount: 1000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            },
            mode: "subscription",
            success_url: settingUrl,
            cancel_url: settingUrl,
            billing_address_collection: "auto"
        })

        return new NextResponse(JSON.stringify({url: stripeSession.url}), {status: 200})

        
    } catch (error) {
        console.log("STRIPE_ERROR", error)
        return new NextResponse("Internal error", {status: 500})
    }
}