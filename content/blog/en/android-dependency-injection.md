# Dependency Injection on Android with Hilt

Dependency injection (DI) is a widely used technique in current Android apps. Here I explain how to implement it with Hilt, Google's official solution: setup, modules, ViewModels and tests.

## What is dependency injection?

It's a design pattern for building loosely coupled components, which makes code easier to test and maintain. Hilt is a library that simplifies implementing DI on Android.

## Basic setup

### 1. Dependencies
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

## Main components

### 1. Modules
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

### 2. Injecting into Activities and Fragments
```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    @Inject
    lateinit var userRepository: UserRepository
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // userRepository is already injected
    }
}
```

## Advanced patterns

### 1. Injecting into ViewModels
```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {
    // ...
}
```

### 2. Custom modules
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

### 1. Test setup
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

### 2. Test modules
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

## Best practices

### Module structure

- Split modules by feature.
- Use appropriate scopes.
- Keep modules small and focused.

### Injection

- Use constructor injection whenever you can.
- Keep field injection (`@Inject lateinit var`) for classes Android creates, such as Activities, Fragments and Services.
- In Activities and Fragments, inject only what the view needs and leave the logic in the ViewModel.

### Tests

- Create dedicated test modules.
- Use fakes or mocks as needed.
- Keep tests independent of each other.

## Usage examples

### 1. Injecting into a Service
```kotlin
@AndroidEntryPoint
class MyService : Service() {
    @Inject
    lateinit var dataManager: DataManager
    
    override fun onBind(intent: Intent?): IBinder? = null
}
```

### 2. Injecting into a WorkManager Worker
```kotlin
@HiltWorker
class MyWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted workerParams: WorkerParameters,
    private val repository: Repository
) : CoroutineWorker(context, workerParams) {
    override suspend fun doWork(): Result {
        // ...
        return Result.success()
    }
}
```

For WorkManager to use Hilt, the `Application` class implements `Configuration.Provider` with an injected `HiltWorkerFactory`, and WorkManager's default initializer is turned off in the manifest.

## Benefits of Hilt

Hilt integrates with Android and with ViewModel, needs minimal setup, comes with testing support and has official documentation. It's easy to use, and its integration with the Android ecosystem and its testing support make it the preferred choice for current projects.
