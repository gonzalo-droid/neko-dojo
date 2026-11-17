# Dependency Injection on Android with Hilt

Dependency injection is a fundamental technique in modern Android app development. In this article, we'll explore how to implement DI using Hilt, Google's official solution.

## What Is Dependency Injection?

Dependency injection is a design pattern that lets you build loosely coupled components, making code easier to test and maintain. Hilt is a library that simplifies implementing DI on Android.

## Basic Setup

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

## Main Components

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

## Advanced Patterns

### 1. Injecting into ViewModels
```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {
    // ...
}
```

### 2. Custom Modules
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

### 1. Test Setup
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

### 2. Test Modules
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

## Best Practices

1. **Module structure**
   - Split modules by feature
   - Use appropriate scopes
   - Keep modules small and focused

2. **Dependency injection**
   - Inject at the highest possible level
   - Use constructor injection whenever possible
   - Avoid dependency injection in UI classes

3. **Testing**
   - Create dedicated test modules
   - Use fakes or mocks as needed
   - Keep tests independent

## Usage Examples

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
) : CoroutineWorker(context, workerParams)
```

## Benefits of Hilt

- **Android integration**
- **Minimal setup**
- **Testing support**
- **ViewModel integration**
- **Official documentation**

## Conclusion

Hilt provides a robust, easy-to-use solution for dependency injection on Android. Its integration with the Android ecosystem and its testing support make it the preferred choice for modern projects.
