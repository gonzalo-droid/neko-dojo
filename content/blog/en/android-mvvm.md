# MVVM Architecture on Android

The MVVM (Model-View-ViewModel) pattern is one of the most popular architectures in modern Android app development. In this article, we'll explore how to implement MVVM correctly.

## What Is MVVM?

MVVM is an architectural pattern that separates presentation logic from business logic and the user interface. Its main components are:

- **Model**: Represents the data and business logic
- **View**: The user interface
- **ViewModel**: Handles presentation logic and UI state

## Basic Implementation

### 1. Model
```kotlin
data class User(
    val id: String,
    val name: String,
    val email: String
)

interface UserRepository {
    suspend fun getUsers(): List<User>
    suspend fun saveUser(user: User)
}
```

### 2. ViewModel
```kotlin
class UserViewModel(
    private val repository: UserRepository
) : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    fun loadUsers() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                _users.value = repository.getUsers()
            } catch (e: Exception) {
                // Handle error
            } finally {
                _isLoading.value = false
            }
        }
    }
}
```

### 3. View (Compose)
```kotlin
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val users by viewModel.users.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    LaunchedEffect(Unit) {
        viewModel.loadUsers()
    }

    if (isLoading) {
        CircularProgressIndicator()
    } else {
        LazyColumn {
            items(users) { user ->
                UserItem(user)
            }
        }
    }
}
```

## Best Practices

1. **State management**
   - Use StateFlow for observable state
   - Implement UI states (loading, error, success)
   - Handle configuration changes

2. **Dependency injection**
   - Use Hilt for injection
   - Provide ViewModels through ViewModelProvider
   - Keep dependencies testable

3. **Testing**
   - Unit tests for ViewModels
   - Integration tests for repositories
   - UI tests with Compose

## Testing Example

```kotlin
@Test
fun `test user loading`() = runTest {
    // Arrange
    val repository = mock<UserRepository>()
    val users = listOf(User("1", "Test", "test@test.com"))
    whenever(repository.getUsers()).thenReturn(users)
    
    val viewModel = UserViewModel(repository)
    
    // Act
    viewModel.loadUsers()
    
    // Assert
    assertEquals(users, viewModel.users.value)
    assertFalse(viewModel.isLoading.value)
}
```

## Benefits of MVVM

- **Separation of concerns**
- **Improved testability**
- **Code maintainability**
- **Component reuse**
- **Simpler lifecycle**

## Conclusion

MVVM is a robust, flexible architecture that fits the needs of modern Android development well. With the right tools and by following best practices, you can build maintainable, scalable apps.
