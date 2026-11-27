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

### 2. OpenAI API
```kotlin
// OpenAI integration example
class OpenAIService {
    private val client = OkHttpClient()
    private val gson = Gson()

    suspend fun generateText(prompt: String): String {
        val request = Request.Builder()
            .url("https://api.openai.com/v1/completions")
            .addHeader("Authorization", "Bearer $apiKey")
            .post(RequestBody.create(
                MediaType.parse("application/json"),
                gson.toJson(ChatRequest(prompt))
            ))
            .build()

        return withContext(Dispatchers.IO) {
            client.newCall(request).execute().use { response ->
                // Process response
            }
        }
    }
}
```

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
