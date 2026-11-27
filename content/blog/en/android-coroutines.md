# Coroutines on Android: Modern Asynchronous Programming

Kotlin coroutines handle asynchronous operations on Android. In this article I go over the basic concepts, some common patterns, how they work with ViewModel and Room, and how to test them.

## What are coroutines?

With coroutines you write sequential code for asynchronous operations. On Android they're mostly useful for network calls, database access and other tasks that shouldn't block the main thread.

## Basic concepts

### 1. Scope and context
```kotlin
class MyViewModel : ViewModel() {
    // ViewModel-specific scope
    private val viewModelScope = CoroutineScope(Dispatchers.Main + Job())
    
    fun fetchData() {
        viewModelScope.launch {
            // Asynchronous code
        }
    }
}
```

### 2. Dispatchers
```kotlin
class Repository {
    suspend fun fetchData() = withContext(Dispatchers.IO) {
        // Network or database operations
    }
    
    suspend fun updateUI() = withContext(Dispatchers.Main) {
        // UI updates
    }
}
```

## Common patterns

### 1. Error handling
```kotlin
class UserRepository {
    suspend fun getUser(id: String): Result<User> = try {
        withContext(Dispatchers.IO) {
            val user = api.getUser(id)
            Result.success(user)
        }
    } catch (e: Exception) {
        Result.failure(e)
    }
}

// Usage
viewModelScope.launch {
    userRepository.getUser("123")
        .onSuccess { user ->
            // Handle success
        }
        .onFailure { error ->
            // Handle error
        }
}
```

### 2. Parallel operations
```kotlin
class DataManager {
    suspend fun loadData() = coroutineScope {
        val users = async { userRepository.getUsers() }
        val posts = async { postRepository.getPosts() }
        
        val result = Pair(users.await(), posts.await())
        result
    }
}
```

## Android integration

### 1. ViewModel
```kotlin
class UserViewModel(
    private val repository: UserRepository
) : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()
    
    fun loadUsers() {
        viewModelScope.launch {
            try {
                _users.value = repository.getUsers()
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
}
```

### 2. Room database
```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM users")
    suspend fun getUsers(): List<User>
    
    @Insert
    suspend fun insertUser(user: User)
}

class UserRepository(
    private val userDao: UserDao
) {
    suspend fun getUsers() = withContext(Dispatchers.IO) {
        userDao.getUsers()
    }
}
```

## Best practices

### Scopes

- Use `viewModelScope` in ViewModels.
- Use `lifecycleScope` in Activities/Fragments.
- Create custom scopes only when you need them.

### Error handling

- Wrap critical operations in try-catch.
- Use `Result` to wrap results.
- Handle network errors separately.

### Performance

- Choose the right dispatcher.
- Avoid blocking operations.
- Use `withContext` to switch contexts.

## Testing

```kotlin
@Test
fun testUserLoading() = runTest {
    // Arrange
    val repository = mock<UserRepository>()
    val users = listOf(User("1", "Test"))
    whenever(repository.getUsers()).thenReturn(users)
    
    val viewModel = UserViewModel(repository)
    
    // Act
    viewModel.loadUsers()
    
    // Assert
    assertEquals(users, viewModel.users.value)
}
```

## Benefits of coroutines

The code is more readable and easier to maintain, with less boilerplate. Error handling is clearer, they integrate with other Kotlin APIs, and scopes like `viewModelScope` give you better lifecycle control.
