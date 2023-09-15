import { fastify } from "fastify"

import { uploadVideo } from "./routes/upload-video"
import { getAllPrompts } from "./routes/get-all-prompts"
import { createTranscription } from "./routes/create-transcription"
import { generateAiCompletion } from "./routes/generate-ai-completion"

const app = fastify()

app.register(uploadVideo)
app.register(getAllPrompts)
app.register(createTranscription)
app.register(generateAiCompletion)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("Http server running"))

// 1:06:00
