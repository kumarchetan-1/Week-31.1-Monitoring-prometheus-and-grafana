import express from "express"
import middleware from "./middleware.ts"

const app = express()

app.use(middleware)

app.get("/user", (req, res) => {
    res.send("Hello User")
})

app.get("/cpu", (req, res) => {
    for (let i = 0; i < 1000000000; i++) {
        console.log(i)
    }
})



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})