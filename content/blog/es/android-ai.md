# Integración de IA en Apps Android

Aquí repaso tres formas de agregar inteligencia artificial a una app Android (ML Kit, la API de OpenAI y TensorFlow Lite), con un ejemplo de código para cada una, además de algunas prácticas y casos de uso.

## ¿Por qué integrar IA en Android?

Con IA, una app puede procesar lenguaje natural, reconocer imágenes, hacer recomendaciones personalizadas y automatizar tareas.

## Opciones de integración

### 1. ML Kit
```kotlin
// Ejemplo de reconocimiento de texto
val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
val image = InputImage.fromBitmap(bitmap, 0)

recognizer.process(image)
    .addOnSuccessListener { visionText ->
        // Procesar el texto reconocido
        val text = visionText.text
    }
    .addOnFailureListener { e ->
        // Manejar errores
    }
```

### 2. OpenAI API
```kotlin
// Ejemplo de integración con OpenAI
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
                // Procesar respuesta
            }
        }
    }
}
```

### 3. TensorFlow Lite
```kotlin
// Ejemplo de clasificación de imágenes
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

## Mejores prácticas

### Optimización de recursos

Usa modelos ligeros, cárgalos de forma diferida y maneja bien el ciclo de vida.

### Experiencia de usuario

Muestra feedback visual, maneja los errores sin romper la experiencia y ofrece alternativas offline.

### Privacidad y seguridad

Procesa los datos sensibles en el dispositivo, usa cifrado y respeta las políticas de privacidad.

## Casos de uso comunes

- Texto: traducción, resumen de contenido y análisis de sentimiento.
- Imágenes: reconocimiento de objetos, clasificación de imágenes y filtros inteligentes.
- Recomendaciones: contenido personalizado, sugerencias de productos y predicción de comportamiento.
