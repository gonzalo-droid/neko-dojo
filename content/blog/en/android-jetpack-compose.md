# Jetpack Compose: The Future of UI on Android

Jetpack Compose is Android's current toolkit for building native UI, and it simplifies and speeds up interface development. Here I go over its main features and how to use it well.

## What is Jetpack Compose?

It's a declarative UI toolkit for building native Android interfaces in Kotlin. Instead of the traditional View system, you build the interface out of composable functions.

## Basic concepts

### 1. Composable functions
```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}

@Composable
fun App() {
    Column {
        Greeting("Android")
        Button(onClick = { /* action */ }) {
            Text("Click me")
        }
    }
}
```

### 2. State and recomposition
```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

## Main components

### 1. Layouts
```kotlin
@Composable
fun LayoutExample() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text("Header")
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Left")
            Text("Right")
        }
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(100.dp)
                .background(Color.Gray)
        ) {
            Text("Centered", modifier = Modifier.align(Alignment.Center))
        }
    }
}
```

### 2. Lists and grids
```kotlin
@Composable
fun ListExample(items: List<String>) {
    LazyColumn {
        items(items) { item ->
            ListItem(
                headlineContent = { Text(item) },
                leadingContent = {
                    Icon(Icons.Default.Person, contentDescription = null)
                }
            )
        }
    }
}
```

## Themes and styles

### 1. Material Design 3
```kotlin
@Composable
fun ThemedApp() {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Purple80,
            secondary = PurpleGrey80
        ),
        typography = Typography
    ) {
        // App content
    }
}
```

### 2. Custom modifiers
```kotlin
fun Modifier.cardStyle() = this
    .padding(16.dp)
    .background(
        color = MaterialTheme.colorScheme.surface,
        shape = RoundedCornerShape(8.dp)
    )
    .shadow(4.dp)

@Composable
fun CardExample() {
    Box(modifier = Modifier.cardStyle()) {
        Text("Card content")
    }
}
```

## Navigation

```kotlin
@Composable
fun NavigationExample() {
    val navController = rememberNavController()
    
    NavHost(navController = navController, startDestination = "home") {
        composable("home") { HomeScreen(navController) }
        composable("detail/{id}") { backStackEntry ->
            DetailScreen(
                id = backStackEntry.arguments?.getString("id"),
                onBack = { navController.popBackStack() }
            )
        }
    }
}
```

## Best practices

### Composition vs. inheritance

- Prefer composition over inheritance.
- Build reusable components.
- Keep composable functions small.

### State management

- Use `remember` and `mutableStateOf`.
- Use a `ViewModel` for complex logic.
- Use `LaunchedEffect` for side effects.

### Performance

- Avoid unnecessary recompositions.
- Use `remember` and `derivedStateOf`.
- Use `key` in lists.

## Testing

```kotlin
@Test
fun testGreeting() {
    composeTestRule.setContent {
        Greeting("Android")
    }
    
    composeTestRule.onNodeWithText("Hello, Android!")
        .assertIsDisplayed()
}
```

## Benefits of Compose

With Compose the code is more concise and readable, with less boilerplate. State is easier to manage, you get a real-time preview, and it integrates with Material Design 3. Its declarative approach and its Kotlin integration change quite a bit about how interfaces are built on Android.
