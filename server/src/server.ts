import { fastify } from "fastify"

import { uploadVideo } from "./routes/upload-video"
import { getAllPrompts } from "./routes/get-all-prompts"

const app = fastify()

app.register(uploadVideo)
app.register(getAllPrompts)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("Http server running"))
