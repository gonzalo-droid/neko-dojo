# Building Apps with Kotlin Multiplatform

Kotlin Multiplatform (KMP) lets you share code across platforms, mainly Android and iOS. Here I go over how a KMP project is organized, which libraries it uses and some practices worth following.

## What is Kotlin Multiplatform?

With KMP you write common code in Kotlin and compile it for each platform. That way you can share business logic, data handling and other parts of the app between Android and iOS.

## Benefits of using KMP

Sharing code means less duplication and a single codebase to maintain for several platforms. Each platform gets native code, so you do not lose performance, and you decide how much code to share: a lot or very little.

## Basic structure of a KMP project

Shared code lives in `commonMain`, and each platform has its own implementation in `androidMain` and `iosMain`:

```kotlin
// commonMain/kotlin/com/example/shared/Repository.kt
interface Repository {
    suspend fun getData(): List<Data>
}

// androidMain/kotlin/com/example/shared/AndroidRepository.kt
class AndroidRepository : Repository {
    override suspend fun getData(): List<Data> {
        // Android-specific implementation
    }
}

// iosMain/kotlin/com/example/shared/IosRepository.kt
class IosRepository : Repository {
    override suspend fun getData(): List<Data> {
        // iOS-specific implementation
    }
}
```

## Essential libraries

1. Ktor: multiplatform HTTP client.
2. Kotlinx.serialization: JSON serialization.
3. SQLDelight: multiplatform SQL database.
4. Koin: dependency injection.

## Implementation example

```kotlin
// Shared model
data class User(
    val id: String,
    val name: String,
    val email: String
)

// Shared repository
interface UserRepository {
    suspend fun getUsers(): List<User>
    suspend fun saveUser(user: User)
}

// Shared ViewModel
class UserViewModel(
    private val repository: UserRepository
) {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    suspend fun loadUsers() {
        _users.value = repository.getUsers()
    }
}
```

## Best practices

### Separation of concerns

Common code and business logic go in shared modules. The UI is written on each platform.

### Dependency management

Use expect/actual for platform-specific APIs, implement the interfaces on each platform and keep them compatible.

### Testing

Write unit tests for the shared code and platform-specific tests for each platform, with mocks and stubs where you need them.
