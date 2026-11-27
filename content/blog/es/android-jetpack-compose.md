# Jetpack Compose: El futuro de la UI en Android

Jetpack Compose es el toolkit actual de Android para construir UI nativa, y simplifica y acelera el desarrollo de interfaces. Aquí repaso sus características principales y cómo usarlo bien.

## ¿Qué es Jetpack Compose?

Es un toolkit de UI declarativa para crear interfaces nativas de Android en Kotlin. En lugar del sistema de vistas tradicional, la interfaz se arma con funciones composables.

## Conceptos básicos

### 1. Funciones composables
```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}

@Composable
fun App() {
    Column {
        Greeting("Android")
        Button(onClick = { /* acción */ }) {
            Text("Click me")
        }
    }
}
```

### 2. Estado y recomposición
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

## Componentes principales

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

### 2. Listas y grids
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

## Temas y estilos

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
        // Contenido de la app
    }
}
```

### 2. Modificadores personalizados
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

## Navegación

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

## Mejores prácticas

### Composición vs. herencia

- Preferir la composición sobre la herencia.
- Crear componentes reutilizables.
- Mantener pequeñas las funciones composables.

### Manejo de estado

- Usar `remember` y `mutableStateOf`.
- Usar un `ViewModel` para la lógica compleja.
- Usar `LaunchedEffect` para los efectos secundarios.

### Performance

- Evitar recomposiciones innecesarias.
- Usar `remember` y `derivedStateOf`.
- Usar `key` en las listas.

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

## Ventajas de Compose

Con Compose el código queda más conciso y legible, y con menos boilerplate. El estado se maneja mejor, hay preview en tiempo real y se integra con Material Design 3. Su enfoque declarativo y su integración con Kotlin cambian bastante la forma de crear interfaces en Android. 