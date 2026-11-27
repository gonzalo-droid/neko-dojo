# Integrating AI into Android Apps

Here I go over three ways to add artificial intelligence to an Android app (ML Kit, the OpenAI API and TensorFlow Lite), with a code example for each, plus some practices and use cases.

## Why integrate AI into Android?

With AI, an app can process natural language, recognize images, make personalized recommendations and automate tasks.

## Integration options

### 1. ML Kit
```kotlin
// Text recognition example
val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
val image = InputImage.fromBitmap(bitmap, 0)

recognizer.process(image)
    .addOnSuccessListener { visionText ->
        // Process the recognized text
        val text = visionText.text
    }
    .addOnFailureListener { e ->
        // Handle errors
    }
```

### 2. The OpenAI API through your backend

The OpenAI key should not ship inside the app: anyone can pull it out of the APK. The app calls an endpoint of yours, and that server calls the OpenAI API with the key stored as a secret.

```kotlin
// The app never sees the OpenAI key
class AiService(private val client: OkHttpClient = OkHttpClient()) {
    private val jsonType = "application/json".toMediaType()

    suspend fun generateText(prompt: String): String = withContext(Dispatchers.IO) {
        val body = JSONObject().put("prompt", prompt).toString().toRequestBody(jsonType)
        val request = Request.Builder()
            .url("https://api.your-backend.com/ai/generate") // your endpoint, not api.openai.com
            .post(body)
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw IOException("HTTP ${response.code}")
            JSONObject(response.body!!.string()).getString("text") // you define the response format
        }
    }
}
```

On the server, that endpoint uses OpenAI's Responses or Chat Completions API (the legacy `/v1/completions` endpoint is no longer recommended) and returns only the text the app needs.

### 3. TensorFlow Lite
```kotlin
// Image classification example
class ImageClassifier(private val context: Context) {
    private var interpreter: Interpreter? = null

    init {
        val model = FileUtil.loadMappedFile(context, "model.tflite")
        interpreter = Interpreter(model)
    }

    fun classifyImage(bitmap: Bitmap): List<Classification> {
        val resizedImage = Bitmap.createScaledBitmap(bitmap, 224, 224, true)
        val byteBuffer = convertBitmapToByteBuffer(resizedImage)
        val result = Array(1) { FloatArray(NUM_CLASSES) }

        interpreter?.run(byteBuffer, result)

        return processResults(result[0])
    }
}
```

## Best practices

### Resource optimization

Use lightweight models, load them lazily and handle the lifecycle properly.

### User experience

Show visual feedback, handle errors without breaking the experience and offer offline alternatives.

### Privacy and security

Process sensitive data on the device, use encryption and respect privacy policies.

## Common use cases

- Text: translation, content summarization and sentiment analysis.
- Images: object recognition, image classification and smart filters.
- Recommendations: personalized content, product suggestions and behavior prediction.
