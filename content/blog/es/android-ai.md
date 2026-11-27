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

### 2. API de OpenAI a través de tu backend

La clave de OpenAI no debe ir dentro de la app: cualquiera puede sacarla del APK. La app llama a un endpoint tuyo, y ese servidor llama a la API de OpenAI con la clave guardada como secreto.

```kotlin
// La app nunca ve la clave de OpenAI
class AiService(private val client: OkHttpClient = OkHttpClient()) {
    private val jsonType = "application/json".toMediaType()

    suspend fun generateText(prompt: String): String = withContext(Dispatchers.IO) {
        val body = JSONObject().put("prompt", prompt).toString().toRequestBody(jsonType)
        val request = Request.Builder()
            .url("https://api.tu-backend.com/ai/generate") // tu endpoint, no api.openai.com
            .post(body)
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) throw IOException("HTTP ${response.code}")
            JSONObject(response.body!!.string()).getString("text") // el formato de respuesta lo defines tú
        }
    }
}
```

En el servidor, ese endpoint usa la API de Responses o la de Chat Completions de OpenAI (el endpoint antiguo `/v1/completions` ya no se recomienda) y devuelve solo el texto que la app necesita.

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
