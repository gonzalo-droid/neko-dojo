# Coroutines en Android: Programación asíncrona moderna

Las coroutines de Kotlin sirven para manejar operaciones asíncronas en Android. En este artículo reviso los conceptos básicos, algunos patrones comunes, cómo se usan con ViewModel y Room, y cómo probarlas.

## ¿Qué son las coroutines?

Con coroutines escribes código secuencial para operaciones asíncronas. En Android son útiles sobre todo para llamadas de red, acceso a base de datos y otras tareas que no deben bloquear el hilo principal.

## Conceptos básicos

### 1. Scope y context
```kotlin
class MyViewModel : ViewModel() {
    // Scope específico para ViewModel
    private val viewModelScope = CoroutineScope(Dispatchers.Main + Job())
    
    fun fetchData() {
        viewModelScope.launch {
            // Código asíncrono
        }
    }
}
```

### 2. Dispatchers
```kotlin
class Repository {
    suspend fun fetchData() = withContext(Dispatchers.IO) {
        // Operaciones de red o base de datos
    }
    
    suspend fun updateUI() = withContext(Dispatchers.Main) {
        // Actualizaciones de UI
    }
}
```

## Patrones comunes

### 1. Manejo de errores
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

// Uso
viewModelScope.launch {
    userRepository.getUser("123")
        .onSuccess { user ->
            // Manejar éxito
        }
        .onFailure { error ->
            // Manejar error
        }
}
```

### 2. Operaciones paralelas
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

## Integración con Android

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
                // Manejar error
            }
        }
    }
}
```

### 2. Base de datos Room
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

## Buenas prácticas

### Scopes

- Usa `viewModelScope` en ViewModels.
- Usa `lifecycleScope` en Activities/Fragments.
- Crea scopes personalizados solo cuando los necesites.

### Manejo de errores

- Envuelve en try-catch las operaciones críticas.
- Usa `Result` para encapsular resultados.
- Trata los errores de red por separado.

### Rendimiento

- Elige el dispatcher correcto.
- Evita operaciones bloqueantes.
- Usa `withContext` para cambiar de contexto.

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

## Ventajas de las coroutines

El código queda más legible y fácil de mantener, con menos boilerplate. Los errores se manejan mejor, se integran con otras APIs de Kotlin y, con scopes como `viewModelScope`, controlas mejor el ciclo de vida.
