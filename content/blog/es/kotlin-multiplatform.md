# Desarrollo de Apps con Kotlin Multiplatform

Kotlin Multiplatform (KMP) permite compartir código entre plataformas, sobre todo Android e iOS. Aquí reviso cómo se organiza un proyecto KMP, qué bibliotecas se usan y algunas prácticas que conviene seguir.

## ¿Qué es Kotlin Multiplatform?

Con KMP escribes código común en Kotlin y lo compilas para cada plataforma. Así puedes compartir entre Android e iOS la lógica de negocio, el manejo de datos y otras partes de la app.

## Ventajas de usar KMP

Al compartir código hay menos duplicación y un solo código base que mantener para varias plataformas. Cada plataforma recibe código nativo, así que no pierdes rendimiento, y tú decides cuánto código compartir: puede ser mucho o muy poco.

## Estructura básica de un proyecto KMP

El código compartido vive en `commonMain`, y cada plataforma tiene su propia implementación en `androidMain` e `iosMain`:

```kotlin
// commonMain/kotlin/com/example/shared/Repository.kt
interface Repository {
    suspend fun getData(): List<Data>
}

// androidMain/kotlin/com/example/shared/AndroidRepository.kt
class AndroidRepository : Repository {
    override suspend fun getData(): List<Data> {
        // Implementación específica para Android
    }
}

// iosMain/kotlin/com/example/shared/IosRepository.kt
class IosRepository : Repository {
    override suspend fun getData(): List<Data> {
        // Implementación específica para iOS
    }
}
```

## Bibliotecas esenciales

1. Ktor: cliente HTTP multiplataforma.
2. Kotlinx.serialization: serialización JSON.
3. SQLDelight: base de datos SQL multiplataforma.
4. Koin: inyección de dependencias.

## Ejemplo de implementación

```kotlin
// Modelo compartido
data class User(
    val id: String,
    val name: String,
    val email: String
)

// Repositorio compartido
interface UserRepository {
    suspend fun getUsers(): List<User>
    suspend fun saveUser(user: User)
}

// ViewModel compartido
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

## Mejores prácticas

### Separación de responsabilidades

El código común y la lógica de negocio van en módulos compartidos. La UI se escribe en cada plataforma.

### Manejo de dependencias

Usa expect/actual para las APIs propias de cada plataforma, implementa las interfaces en cada una y mantén la compatibilidad entre ellas.

### Testing

Escribe pruebas unitarias para el código compartido y pruebas específicas para cada plataforma, con mocks y stubs donde hagan falta.
