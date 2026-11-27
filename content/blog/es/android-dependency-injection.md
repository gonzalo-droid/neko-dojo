# Inyección de Dependencias en Android con Hilt

La inyección de dependencias (DI) es una técnica muy usada en las apps Android actuales. Aquí explico cómo implementarla con Hilt, la solución oficial de Google: la configuración, los módulos, los ViewModels y las pruebas.

## ¿Qué es la inyección de dependencias?

Es un patrón de diseño para crear componentes débilmente acoplados, lo que hace el código más fácil de probar y de mantener. Hilt es una biblioteca que simplifica la implementación de DI en Android.

## Configuración básica

### 1. Dependencias
```gradle
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
}

dependencies {
    implementation "com.google.dagger:hilt-android:2.44"
    kapt "com.google.dagger:hilt-android-compiler:2.44"
}
```

### 2. Application
```kotlin
@HiltAndroidApp
class MyApplication : Application()
```

## Componentes principales

### 1. Módulos
```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun provideUserRepository(
        api: UserApi,
        db: UserDatabase
    ): UserRepository {
        return UserRepositoryImpl(api, db)
    }
    
    @Provides
    @Singleton
    fun provideUserApi(): UserApi {
        return Retrofit.Builder()
            .baseUrl("https://api.example.com/")
            .build()
            .create(UserApi::class.java)
    }
}
```

### 2. Inyección en Activities y Fragments
```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    @Inject
    lateinit var userRepository: UserRepository
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // userRepository ya está inyectado
    }
}
```

## Patrones avanzados

### 1. Inyección en ViewModels
```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {
    // ...
}
```

### 2. Módulos personalizados
```kotlin
@Module
@InstallIn(ActivityComponent::class)
object UserModule {
    @Provides
    fun provideUserManager(
        @ApplicationContext context: Context
    ): UserManager {
        return UserManager(context)
    }
}
```

## Testing

### 1. Configuración de pruebas
```kotlin
@HiltAndroidTest
class UserRepositoryTest {
    @get:Rule
    val hiltRule = HiltAndroidRule(this)
    
    @Inject
    lateinit var userRepository: UserRepository
    
    @Before
    fun setup() {
        hiltRule.inject()
    }
}
```

### 2. Módulos de prueba
```kotlin
@Module
@TestInstallIn(
    components = [SingletonComponent::class],
    replaces = [AppModule::class]
)
object TestAppModule {
    @Provides
    @Singleton
    fun provideUserRepository(): UserRepository {
        return FakeUserRepository()
    }
}
```

## Mejores prácticas

### Estructura de módulos

- Separar los módulos por funcionalidad.
- Usar scopes apropiados.
- Mantener los módulos pequeños y enfocados.

### Inyección

- Inyectar en el nivel más alto posible.
- Usar constructor injection cuando se pueda.
- Evitar la inyección de dependencias en clases de UI.

### Pruebas

- Crear módulos de prueba específicos.
- Usar fakes o mocks según haga falta.
- Mantener las pruebas independientes entre sí.

## Ejemplos de uso

### 1. Inyección en un Service
```kotlin
@AndroidEntryPoint
class MyService : Service() {
    @Inject
    lateinit var dataManager: DataManager
    
    override fun onBind(intent: Intent?): IBinder? = null
}
```

### 2. Inyección en un Worker de WorkManager
```kotlin
@HiltWorker
class MyWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted workerParams: WorkerParameters,
    private val repository: Repository
) : CoroutineWorker(context, workerParams)
```

## Ventajas de Hilt

Hilt se integra con Android y con ViewModel, pide una configuración mínima, trae soporte para pruebas y tiene documentación oficial. Es fácil de usar y, por su integración con el ecosistema Android y su soporte para pruebas, es la opción preferida en proyectos actuales. 