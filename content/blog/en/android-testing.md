# Testing on Android: A Complete Guide

In this article I go over the kinds of tests you write on Android (unit, integration, UI, ViewModel and coroutine tests) and the tools for each one.

## Types of testing

### 1. Unit testing
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

### 2. Integration testing
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

## UI testing

### 1. Compose testing
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

### 2. Espresso testing
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

## Testing ViewModels

### 1. ViewModel testing
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

### 2. State testing
```kotlin
@Test
fun `test loading state`() = runTest {
    // Arrange
    val viewModel = UserViewModel(repository)
    
    // Act
    viewModel.loadUsers()
    
    // Assert
    assertTrue(viewModel.isLoading.value)
    
    // Simulate loading completed
    advanceUntilIdle()
    
    assertFalse(viewModel.isLoading.value)
}
```

## Testing coroutines

### 1. Coroutine testing
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

### 2. Error handling
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

## Best practices

### Test structure

- Follow the AAA pattern (Arrange-Act-Assert).
- Keep tests independent of each other.
- Use descriptive names.

### Mocks and fakes

- Use mocks for external dependencies.
- Write fakes for integration tests.
- Don't overuse mocks.

### Code coverage

- Aim for coverage that means something.
- Focus on critical use cases.
- Don't obsess over 100%.

## Testing tools

- JUnit: the base framework. It provides annotations for setup and assertions for validation.
- Mockito: creates mocks, verifies interactions and stubs behavior.
- Espresso: UI tests with views. It interacts with them and validates their state.
- Compose Testing: the same for declarative UI, with composables.

## Benefits of good testing

Tests catch bugs early, let you refactor safely and give you confidence in your code. They also work as living documentation, push you toward better design and, over time, help keep code quality up and make maintenance easier.
