import { fastify } from "fastify"

import { uploadVideo } from "./routes/upload-video"
import { getAllPrompts } from "./routes/get-all-prompts"
import { createTranscription } from "./routes/create-transcription"

const app = fastify()

app.register(uploadVideo)
app.register(getAllPrompts)
app.register(createTranscription)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("Http server running"))
