const express = require('express')
const app = express()
const authRouter = require('./authRouter')
const SitePort = 5001

app.use(express.json())
app.use('/auth', authRouter)

app.listen(SitePort, () => console.log(`Server started on PORT ${SitePort}`))
