# MVVM Architecture on Android

MVVM (Model-View-ViewModel) is one of the most widely used architectures on Android. Here I explain how to implement it with StateFlow, Compose and Hilt, and how to test the ViewModel.

## What is MVVM?

MVVM is a pattern that separates presentation logic from business logic and from the user interface. It has three components:

- Model: the data and business logic.
- View: the user interface.
- ViewModel: presentation logic and UI state.

## Basic implementation

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

## Best practices

### State management

- Use StateFlow for observable state.
- Define UI states (loading, error, success).
- Handle configuration changes.

### Dependency injection

- Use Hilt for injection.
- Provide ViewModels through ViewModelProvider.
- Keep dependencies easy to test.

### Testing

- Unit tests for ViewModels.
- Integration tests for repositories.
- UI tests with Compose.

## Testing example

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

Each layer has one responsibility, so the code is easier to test and maintain, and components can be reused. Because state lives in the ViewModel, the screen's lifecycle is also simpler to handle.
