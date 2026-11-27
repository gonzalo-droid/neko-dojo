# Testing en Android

En este artículo repaso los tipos de pruebas que se escriben en Android (unitarias, de integración, de UI, de ViewModels y de coroutines) y las herramientas para cada una.

## Tipos de testing

### 1. Pruebas unitarias
```kotlin
class UserRepositoryTest {
    @Test
    fun `test user creation`() {
        // Arrange
        val user = User("1", "Test User")
        
        // Act
        val result = userRepository.createUser(user)
        
        // Assert
        assertTrue(result.isSuccess)
        assertEquals(user, result.getOrNull())
    }
}
```

### 2. Pruebas de integración
```kotlin
@HiltAndroidTest
class UserFlowTest {
    @get:Rule
    val hiltRule = HiltAndroidRule(this)
    
    @Inject
    lateinit var userRepository: UserRepository
    
    @Test
    fun testUserFlow() {
        // Arrange
        val user = User("1", "Test User")
        
        // Act
        userRepository.createUser(user)
        val savedUser = userRepository.getUser("1")
        
        // Assert
        assertEquals(user, savedUser)
    }
}
```

## Testing de UI

### 1. Pruebas con Compose
```kotlin
@Test
fun testUserScreen() {
    composeTestRule.setContent {
        UserScreen(viewModel = viewModel)
    }
    
    composeTestRule
        .onNodeWithText("Test User")
        .assertIsDisplayed()
    
    composeTestRule
        .onNodeWithContentDescription("Edit")
        .performClick()
    
    composeTestRule
        .onNodeWithText("Edit User")
        .assertIsDisplayed()
}
```

### 2. Pruebas con Espresso
```kotlin
@Test
fun testUserList() {
    // Arrange
    val users = listOf(User("1", "Test User"))
    userRepository.setUsers(users)
    
    // Act
    activityRule.launchActivity(null)
    
    // Assert
    onView(withId(R.id.user_list))
        .check(matches(isDisplayed()))
    
    onView(withText("Test User"))
        .check(matches(isDisplayed()))
}
```

## Testing de ViewModels

### 1. Pruebas del ViewModel
```kotlin
class UserViewModelTest {
    @Test
    fun `test user loading`() = runTest {
        // Arrange
        val users = listOf(User("1", "Test User"))
        val repository = mock<UserRepository>()
        whenever(repository.getUsers()).thenReturn(users)
        
        val viewModel = UserViewModel(repository)
        
        // Act
        viewModel.loadUsers()
        
        // Assert
        assertEquals(users, viewModel.users.value)
    }
}
```

### 2. Pruebas de estado
```kotlin
@Test
fun `test loading state`() = runTest {
    // Arrange
    val viewModel = UserViewModel(repository)
    
    // Act
    viewModel.loadUsers()
    
    // Assert
    assertTrue(viewModel.isLoading.value)
    
    // Simular carga completada
    advanceUntilIdle()
    
    assertFalse(viewModel.isLoading.value)
}
```

## Testing de coroutines

### 1. Pruebas de coroutines
```kotlin
@Test
fun `test coroutine flow`() = runTest {
    // Arrange
    val flow = flow {
        emit(1)
        delay(100)
        emit(2)
    }
    
    // Act & Assert
    flow.test {
        assertEquals(1, awaitItem())
        assertEquals(2, awaitItem())
        awaitComplete()
    }
}
```

### 2. Manejo de errores
```kotlin
@Test
fun `test error handling`() = runTest {
    // Arrange
    val error = RuntimeException("Test error")
    val flow = flow { throw error }
    
    // Act & Assert
    flow.test {
        assertTrue(awaitError() is RuntimeException)
    }
}
```

## Buenas prácticas

### Estructura de las pruebas

- Sigue el patrón AAA (Arrange-Act-Assert).
- Mantén las pruebas independientes entre sí.
- Usa nombres descriptivos.

### Mocks y fakes

- Usa mocks para las dependencias externas.
- Escribe fakes para las pruebas de integración.
- No abuses de los mocks.

### Cobertura de código

- Apunta a una cobertura que signifique algo.
- Concéntrate en los casos de uso críticos.
- No te obsesiones con el 100%.

## Herramientas de testing

- JUnit: el framework base. Trae anotaciones para la configuración y assertions para las validaciones.
- Mockito: crea mocks, verifica interacciones y hace stubbing de comportamientos.
- Espresso: pruebas de UI con vistas. Interactúa con ellas y valida su estado.
- Compose Testing: lo mismo para UI declarativa, con composables.

## Ventajas de un buen testing

Las pruebas detectan errores temprano, te dejan refactorizar con seguridad y te dan confianza en el código. También funcionan como documentación viva, empujan hacia un mejor diseño y, con el tiempo, ayudan a mantener la calidad y hacen más fácil el mantenimiento.
