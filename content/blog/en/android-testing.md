# Testing on Android: A Complete Guide

Testing is a fundamental part of Android app development. In this article, we'll explore the different testing strategies and tools available on Android.

## Types of Testing

### 1. Unit Testing
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

### 2. Integration Testing
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

## UI Testing

### 1. Compose Testing
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

### 2. Espresso Testing
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

### 1. ViewModel Testing
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

### 2. State Testing
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

## Testing Coroutines

### 1. Coroutine Testing
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

### 2. Error Handling
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

## Best Practices

1. **Test structure**
   - Follow the AAA pattern (Arrange-Act-Assert)
   - Keep tests independent
   - Use descriptive names

2. **Mocks and fakes**
   - Use mocks for external dependencies
   - Implement fakes for integration testing
   - Avoid excessive mocking

3. **Code coverage**
   - Aim for meaningful coverage
   - Focus on critical use cases
   - Don't obsess over 100%

## Testing Tools

1. **JUnit**
   - Base testing framework
   - Annotations for setup
   - Assertions for validation

2. **Mockito**
   - Creating mocks
   - Verifying interactions
   - Stubbing behavior

3. **Espresso**
   - UI testing
   - Interacting with views
   - State validation

4. **Compose Testing**
   - Declarative UI testing
   - Interacting with composables
   - State validation

## Benefits of Good Testing

- **Early bug detection**
- **Safe refactoring**
- **Living documentation**
- **Better code design**
- **Confidence in your code**

## Conclusion

Testing is an essential part of Android app development. A good testing strategy helps maintain code quality and makes long-term maintenance easier.
