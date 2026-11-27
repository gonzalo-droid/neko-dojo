# Arquitectura MVVM en Android

MVVM (Model-View-ViewModel) es una de las arquitecturas más usadas en Android. Aquí explico cómo implementarlo con StateFlow, Compose y Hilt, y cómo probar el ViewModel.

## ¿Qué es MVVM?

MVVM es un patrón que separa la lógica de presentación de la lógica de negocio y de la interfaz de usuario. Tiene tres componentes:

- Model: los datos y la lógica de negocio.
- View: la interfaz de usuario.
- ViewModel: la lógica de presentación y el estado de la UI.

## Implementación básica

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
                // Manejar error
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

## Buenas prácticas

### Manejo de estado

- Usa StateFlow para el estado observable.
- Define estados de UI (loading, error, success).
- Maneja los cambios de configuración.

### Inyección de dependencias

- Usa Hilt para la inyección.
- Entrega los ViewModels a través de ViewModelProvider.
- Mantén las dependencias fáciles de probar.

### Testing

- Pruebas unitarias para los ViewModels.
- Pruebas de integración para los repositorios.
- Pruebas de UI con Compose.

## Ejemplo de testing

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

## Ventajas de MVVM

Cada capa tiene una sola responsabilidad, así que el código es más fácil de probar y de mantener, y los componentes se pueden reutilizar. Como el estado vive en el ViewModel, el ciclo de vida de la pantalla también se vuelve más simple de manejar.
