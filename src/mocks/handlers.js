import { rest } from "msw"

export const handlers = [
    // THESE ARE FOR RUNNING WITH SERVER
    // rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    //     return res(
    //         ctx.json([
    //             { name: "Chocolate", imagePath: "/images/chocolate.png" },
    //             { name: "Vanilla", imagePath: "/images/vanilla.png" },
    //         ])
    //     )
    // }),
    // rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    //     return res(
    //         ctx.json([
    //             { name: "Cherries", imagePath: "/images/cherries.png" },
    //             { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
    //             { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    //         ])
    //     )
    // }),
    // rest.post("http://localhost:3030/order", (req, res, ctx) => {
    //     return res(ctx.json({ orderNumber: 123455676 }))
    // }),

    // THESE ARE FOR RUNNING SERVERLESS
    rest.get("http://localhost/sundae-options.json", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: "Chocolate", imagePath: "/images/chocolate.png" },
                { name: "Vanilla", imagePath: "/images/vanilla.png" },
            ])
        )
    }),
    rest.get("http://localhost/sundae-options.json", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: "Cherries", imagePath: "/images/cherries.png" },
                { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
                { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
            ])
        )
    }),
    rest.post("/order", (req, res, ctx) => {
        return res(ctx.json({ orderNumber: 123455676 }))
    }),
]
