import type { Locale } from "@/i18n/config";

/**
 * "Sobre mí": contenido migrado tal cual del portafolio gonzalo-lozg.me
 * (repo gonzalo-droid/gonzalo-droid.github.io, content/i18n y content/projects.json, 2026-11-17).
 * No editar cifras ni fechas sin revisar la fuente.
 */
type L = Record<Locale, string>;
export type AboutCase = { context: string[]; problem: string[]; solution: string[] };
export type AboutProject = {
  slug: string; title: string; client: string | null; platforms: string[]; tech: string[]; image: string;
  summary: L; case: Record<Locale, AboutCase>; links: { label: string; url: string }[];
};
export type AboutData = {
  bio: L[]; personal: L; experienceLead: L; cvUrl: string;
  experience: { company: L; role: L; period: L; desc: L }[];
  projects: AboutProject[];
  services: { title: L; desc: L; items: L[] }[];
};

export const about: AboutData = {
  "bio": [
    {
      "es": "Android/Mobile Developer con +5 años construyendo apps en producción con Kotlin. Me especializo en refactorización de legacy, arquitectura limpia (MVVM/MVP/MVI) y modularización para entregar features mantenibles, testeables y escalables. Actualmente trabajo en Banco Falabella y busco seguir creciendo en equipos multiculturales creando productos de alto impacto.",
      "en": "Android/Mobile Developer with 5+ years building production apps in Kotlin. I specialise in legacy refactoring, clean architecture (MVVM/MVP/MVI) and modularisation, delivering features that stay maintainable, testable and scalable. I currently work at Banco Falabella and I'm looking to keep growing in multicultural teams building high-impact products."
    }
  ],
  "personal": {
    "es": "Fuera del código, soy geek y fan de la ciencia ficción, el anime y el manga. Team gatos (Lilith y Garu) y llevo mi proyecto personal Neko Manga Cix, una tienda/comunidad para amantes del manga.",
    "en": "Away from code I'm a sci-fi, anime and manga geek. Cat person (Lilith and Garu), and I run my own side project Neko Manga Cix, a shop and community for manga lovers."
  },
  "experienceLead": {
    "es": "Seis años construyendo apps Android en producción, de startups peruanas a banca en Chile.",
    "en": "Six years building Android apps in production, from Peruvian startups to banking in Chile."
  },
  "cvUrl": "https://drive.google.com/file/d/1aNYpEk3DXCDbyXXamSAKisFue7hUL8C6/view?usp=sharing",
  "experience": [
    {
      "company": {
        "es": "Banco Falabella - Chile",
        "en": "Banco Falabella - Chile"
      },
      "role": {
        "es": "Android Developer",
        "en": "Android Developer"
      },
      "period": {
        "es": "Ago 2025 - Presente",
        "en": "Aug 2025 - Present"
      },
      "desc": {
        "es": "Mantenimiento y evolución de ecosistema multi-módulo para múltiples países. Implementé el nuevo flujo de Tarjeta Digital con Jetpack Compose. Refactorización bajo arquitectura modular (MVP/MVVM + Clean Architecture). Gestión de releases y CI/CD en Bitrise.",
        "en": "Maintenance and evolution of a multi-module ecosystem serving several countries. I built the new Digital Card flow with Jetpack Compose, refactored towards a modular architecture (MVP/MVVM + Clean Architecture), and handled releases and CI/CD on Bitrise."
      }
    },
    {
      "company": {
        "es": "Talana - Chile",
        "en": "Talana - Chile"
      },
      "role": {
        "es": "Android Developer",
        "en": "Android Developer"
      },
      "period": {
        "es": "Oct 2022 - Ago 2025",
        "en": "Oct 2022 - Aug 2025"
      },
      "desc": {
        "es": "Implementé Módulo de Beneficios y Login Biométrico. Desarrollé componentes UI personalizados para rebranding. Instrumentación de producto con Analytics, Firebase Performance y mapas de calor. Migración de funcionalidades hacia Kotlin y Jetpack Compose.",
        "en": "I built the Benefits module and biometric login, and developed custom UI components for a rebrand. Product instrumentation with Analytics, Firebase Performance and heatmaps. Migration of features to Kotlin and Jetpack Compose."
      }
    },
    {
      "company": {
        "es": "PeruAPPS - Perú",
        "en": "PeruAPPS - Peru"
      },
      "role": {
        "es": "Android Developer",
        "en": "Android Developer"
      },
      "period": {
        "es": "Jul 2022 - Sep 2022",
        "en": "Jul 2022 - Sep 2022"
      },
      "desc": {
        "es": "Lideré el desarrollo de PEX, app para gestión de pagos de peajes y consulta de establecimientos cercanos, integrando Google Maps y Firebase.",
        "en": "I led development of PEX, an app for toll payments and nearby-merchant lookup, integrating Google Maps and Firebase."
      }
    },
    {
      "company": {
        "es": "TiSmart - Perú",
        "en": "TiSmart - Peru"
      },
      "role": {
        "es": "Android Developer",
        "en": "Android Developer"
      },
      "period": {
        "es": "Sep 2021 - Jun 2022",
        "en": "Sep 2021 - Jun 2022"
      },
      "desc": {
        "es": "Implementé validación de QR de vacunación en Ripley Pago. Adaptación multi-pantalla con View Binding y layouts optimizados. Desarrollo con Coroutines, MVVM y Clean Architecture en proyecto Tawa.",
        "en": "I implemented vaccination QR validation in Ripley Pago, plus multi-screen support with View Binding and adaptive layouts."
      }
    },
    {
      "company": {
        "es": "Proyectos Independientes - Perú",
        "en": "Independent projects - Peru"
      },
      "role": {
        "es": "Android Developer Freelance",
        "en": "Freelance Android Developer"
      },
      "period": {
        "es": "Oct 2019 - Presente",
        "en": "Oct 2019 - Present"
      },
      "desc": {
        "es": "Desarrollo de aplicaciones comerciales: U-Learning (Android/iOS para estudiantes), Gestión de Proyectos Inmobiliarios (consulta de lotes y pagos), y Gestión de Clientes (monitoreo de ventas con GPS). Despliegues en AWS, Cpanel y Play Store.",
        "en": "Commercial app development: U-Learning (Android/iOS for students), real-estate management and Solti-CRM."
      }
    }
  ],
  "projects": [
    {
      "slug": "nekomangacix",
      "title": "Neko Manga Cix",
      "client": null,
      "platforms": [
        "web"
      ],
      "tech": [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Supabase",
        "Cloudinary",
        "Vercel"
      ],
      "image": "/about/projects/web_nekomangacix_home.webp",
      "summary": {
        "es": "Ecommerce de manga y coleccionables con preventas, reserva del 50% y envíos a todo el Perú.",
        "en": "Manga and collectibles ecommerce with pre-orders, 50% deposits and shipping across Peru."
      },
      "case": {
        "es": {
          "context": [
            "Neko Manga Cix es una tienda peruana de manga y coleccionables con envíos a todo el país."
          ],
          "problem": [
            "Vender un catálogo de miles de títulos y manejar preventas por redes sociales y mensajes directos era lento y se prestaba a errores."
          ],
          "solution": [
            "Desarrollé un ecommerce que reúne más de 6.000 títulos. Se pueden filtrar por editorial, tipo, disponibilidad y precio, o buscar por título, editorial y autor, y cada ficha muestra el SKU, el género y una guía de formatos.",
            "Las preventas se reservan pagando el 50% y el resto al recibir el producto, con tarjeta, Yape o Plin, transferencia o efectivo al recoger. La tienda tiene modo claro y oscuro."
          ]
        },
        "en": {
          "context": [
            "Neko Manga Cix is a Peruvian manga and collectibles store that ships nationwide."
          ],
          "problem": [
            "Selling a catalogue of thousands of titles and handling pre-orders through social media and direct messages was slow and error-prone."
          ],
          "solution": [
            "I built an ecommerce site with more than 6,000 titles. Shoppers can filter by publisher, type, availability and price, or search by title, publisher and author, and every product page shows the SKU, genre and a format guide.",
            "Pre-orders are reserved with a 50% deposit and the rest is paid on delivery, by card, Yape or Plin, bank transfer or cash on pickup. The store has light and dark modes."
          ]
        }
      },
      "links": [
        {
          "label": "Web",
          "url": "https://www.nekomangacix.com/"
        }
      ]
    },
    {
      "slug": "agrosalas",
      "title": "Agrosalas Perú",
      "client": "Agrosalas Peru S.R.L.",
      "platforms": [
        "web"
      ],
      "tech": [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Lucide",
        "Vercel"
      ],
      "image": "/about/projects/web_agrosalas_home.webp",
      "summary": {
        "es": "Sitio corporativo bilingüe para una agroexportadora peruana de menestras en conserva, con catálogo, eventos y cotización por WhatsApp.",
        "en": "Bilingual corporate website for a Peruvian exporter of canned legumes, with a catalogue, events and WhatsApp quotes."
      },
      "case": {
        "es": {
          "context": [
            "Agrosalas Peru es una empresa agroindustrial peruana que exporta menestras en conserva —gandul, pallar y frijoles— a España, Estados Unidos y Panamá."
          ],
          "problem": [
            "No tenía presencia en internet: ni sitio web, ni posicionamiento en Google, ni en redes sociales. Un comprador extranjero no tenía dónde ver sus productos ni cómo pedirle una cotización."
          ],
          "solution": [
            "Desarrollé su sitio web con el catálogo de productos actualizado, en español e inglés, preparado para aparecer en Google y para compartirse bien en redes.",
            "El catálogo reúne trece productos, con búsqueda y filtro por categoría, y cada producto tiene su propia página. Si alguien llega desde otro país, el sitio le ofrece cambiar de idioma.",
            "Cada página lleva a pedir una cotización, por formulario o por WhatsApp, y una sección de eventos muestra las ferias donde participa la empresa, como Expoalimentaria y Expo Perú Norte.",
            "Para que Google lo encuentre, las páginas se entregan ya generadas, con datos estructurados y una imagen propia, en cada idioma, para cuando el enlace se comparte en redes."
          ]
        },
        "en": {
          "context": [
            "Agrosalas Peru is a Peruvian agro-industrial company that exports canned legumes —pigeon peas, lima beans and beans— to Spain, the United States and Panama."
          ],
          "problem": [
            "It had no online presence: no website, no Google ranking and no social media. A foreign buyer had nowhere to see its products or ask for a quote."
          ],
          "solution": [
            "I built its website with an up-to-date product catalogue, in Spanish and English, ready to show up on Google and to look good when shared on social media.",
            "The catalogue brings together thirteen products, with search and category filters, and each product has its own page. When someone arrives from another country, the site offers to switch language.",
            "Every page leads to a quote request, by form or by WhatsApp, and an events section shows the trade fairs the company takes part in, such as Expoalimentaria and Expo Perú Norte.",
            "So that Google can find it, pages are served pre-generated, with structured data and their own preview image in each language for when the link is shared on social media."
          ]
        }
      },
      "links": [
        {
          "label": "Web",
          "url": "https://www.agrosalasperu.com/"
        }
      ]
    },
    {
      "slug": "quote-anime",
      "title": "Quote Anime",
      "client": null,
      "platforms": [
        "android",
        "ios"
      ],
      "tech": [
        "Kotlin",
        "Compose",
        "Swift",
        "Room",
        "Firebase",
        "Glance Widget",
        "WorkManager"
      ],
      "image": "/about/projects/web_quote_anime.webp",
      "summary": {
        "es": "Frases de anime con widget, notificaciones diarias y modo offline.",
        "en": "Anime quotes with a home-screen widget, daily notifications and offline mode."
      },
      "case": {
        "es": {
          "context": [
            "Quote Anime es una app propia de frases de anime para Android e iOS."
          ],
          "problem": [
            "Los fans guardan frases en capturas sueltas, sin poder ordenarlas, verlas sin conexión ni recibir una nueva cada día."
          ],
          "solution": [
            "Hice una app nativa para cada plataforma con las frases ordenadas por anime. Las favoritas se guardan para leerlas sin conexión, y un widget muestra una frase al azar en la pantalla de inicio.",
            "Cada día llega una notificación a la hora que elige el usuario, y cualquier frase se puede compartir como imagen con un diseño propio de la app."
          ]
        },
        "en": {
          "context": [
            "Quote Anime is my own anime quotes app for Android and iOS."
          ],
          "problem": [
            "Fans keep quotes as scattered screenshots, with no way to organise them, read them offline or get a new one every day."
          ],
          "solution": [
            "I built a native app for each platform with quotes organised by anime. Favourites are saved to read offline, and a widget shows a random quote on the home screen.",
            "A notification arrives every day at the time the user picks, and any quote can be shared as an image with the app’s own design."
          ]
        }
      },
      "links": [
        {
          "label": "Play Store",
          "url": "https://play.google.com/store/apps/details?id=com.gondroid.quoteanime"
        },
        {
          "label": "App Store",
          "url": "https://apps.apple.com/pe/app/quoteanime-frases-de-anime/id6762100338?l=en-GB"
        },
        {
          "label": "Web",
          "url": "https://www.animequote.app/"
        }
      ]
    },
    {
      "slug": "autotest-licencia",
      "title": "AutoTest Licencia",
      "client": null,
      "platforms": [
        "android"
      ],
      "tech": [
        "Kotlin",
        "Compose",
        "Clean Architecture",
        "MVVM",
        "Room",
        "Firebase"
      ],
      "image": "/about/projects/app_autotest.webp",
      "summary": {
        "es": "Simulacros y balotarios para el examen de licencia de conducir.",
        "en": "Mock exams and question banks for the Peruvian driving licence test."
      },
      "case": {
        "es": {
          "context": [
            "AutoTest Licencia es una app para preparar el examen de reglas de manejo de la licencia de conducir en Perú."
          ],
          "problem": [
            "Quien se prepara estudia con balotarios en PDF sueltos y no tiene forma de saber si ya está listo para el examen."
          ],
          "solution": [
            "La app ofrece simulacros parecidos a la evaluación real, separados por categoría de licencia, y estadísticas para ver el avance. Los balotarios de cada categoría se pueden descargar y compartir en PDF."
          ]
        },
        "en": {
          "context": [
            "AutoTest Licencia is an app to prepare for the traffic rules exam of the Peruvian driving licence."
          ],
          "problem": [
            "People preparing for it study from scattered PDF question banks and have no way to tell whether they are ready for the exam."
          ],
          "solution": [
            "The app offers mock exams close to the real test, split by licence category, and statistics to track progress. The question banks for each category can be downloaded and shared as PDFs."
          ]
        }
      },
      "links": [
        {
          "label": "Play Store",
          "url": "https://play.google.com/store/apps/details?id=com.gondroid.mtcquiz"
        }
      ]
    },
    {
      "slug": "cixcash",
      "title": "CixCash App",
      "client": null,
      "platforms": [
        "kmm"
      ],
      "tech": [
        "KMM",
        "Kotlin",
        "Compose",
        "Koin",
        "Ktor"
      ],
      "image": "/about/projects/app_cixcash.webp",
      "summary": {
        "es": "Conversión de criptomonedas y divisas en Kotlin Multiplatform, con registro de transacciones.",
        "en": "Crypto and currency conversion in Kotlin Multiplatform, with transaction tracking."
      },
      "case": {
        "es": {
          "context": [
            "CixCash es una app multiplataforma para llevar saldos en divisas y criptomonedas."
          ],
          "problem": [
            "Controlar saldos en varias monedas y cripto obliga a usar varias apps y a calcular las conversiones a mano."
          ],
          "solution": [
            "La construí con Kotlin Multiplatform, así que Android e iOS comparten el mismo código. Muestra el balance de cada moneda, guarda las transacciones en una base de datos local y convierte entre ARS, USD, BTC y ETH."
          ]
        },
        "en": {
          "context": [
            "CixCash is a cross-platform app to keep track of balances in currencies and cryptocurrencies."
          ],
          "problem": [
            "Tracking balances in several currencies and crypto means juggling several apps and working out conversions by hand."
          ],
          "solution": [
            "I built it with Kotlin Multiplatform, so Android and iOS share the same code. It shows the balance for each currency, stores transactions in a local database and converts between ARS, USD, BTC and ETH."
          ]
        }
      },
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/gonzalo-droid/cixCashApp"
        }
      ]
    },
    {
      "slug": "note-ai",
      "title": "Note.AI",
      "client": null,
      "platforms": [
        "android"
      ],
      "tech": [
        "Kotlin",
        "Compose",
        "Room",
        "Firebase",
        "MVVM"
      ],
      "image": "/about/projects/app_noteai.webp",
      "summary": {
        "es": "Notas de voz con transcripción automática usando OpenAI Whisper.",
        "en": "Voice notes with automatic transcription using OpenAI Whisper."
      },
      "case": {
        "es": {
          "context": [
            "Note.AI es una app Android de notas de voz con transcripción automática."
          ],
          "problem": [
            "Escribir notas en movimiento es lento, y las notas de voz no se pueden leer de un vistazo ni buscar."
          ],
          "solution": [
            "Cada nota tiene su grabación asociada, y la app la transcribe sola con OpenAI Whisper, así queda también como texto. Las notas se guardan y se listan en el propio teléfono."
          ]
        },
        "en": {
          "context": [
            "Note.AI is an Android voice notes app with automatic transcription."
          ],
          "problem": [
            "Typing notes on the go is slow, and voice notes cannot be skimmed or searched."
          ],
          "solution": [
            "Each note has its recording attached, and the app transcribes it automatically with OpenAI Whisper, so it is also kept as text. Notes are stored and listed on the phone itself."
          ]
        }
      },
      "links": [
        {
          "label": "GitHub",
          "url": "https://github.com/gonzalo-droid/NoteAI"
        }
      ]
    },
    {
      "slug": "u-learning",
      "title": "U-Learning",
      "client": null,
      "platforms": [
        "android",
        "ios",
        "web"
      ],
      "tech": [
        "Kotlin",
        "Swift",
        "MVI",
        "StateFlow",
        "Hilt",
        "UIKit",
        "Angular",
        "Laravel",
        "AWS"
      ],
      "image": "/about/projects/app_ulearning.webp",
      "summary": {
        "es": "Plataforma educativa para cursos online, en Android, iOS y navegador.",
        "en": "E-learning platform for online courses, on Android, iOS and the web."
      },
      "case": {
        "es": {
          "context": [
            "U-Learning es una plataforma de cursos online para estudiantes, disponible en Android, iOS y navegador."
          ],
          "problem": [
            "La institución necesitaba llevar sus cursos al celular y al navegador de sus estudiantes, administrados desde un solo lugar."
          ],
          "solution": [
            "La app Android está construida con MVI y StateFlow, con pruebas en Mockito, y la de iOS en Swift con UIKit, distribuida por TestFlight.",
            "La plataforma web y el panel administrativo corren en AWS EC2, con despliegue continuo."
          ]
        },
        "en": {
          "context": [
            "U-Learning is an online course platform for students, available on Android, iOS and the web."
          ],
          "problem": [
            "The institution needed to bring its courses to its students’ phones and browsers, managed from a single place."
          ],
          "solution": [
            "The Android app is built with MVI and StateFlow, tested with Mockito, and the iOS app is written in Swift with UIKit and distributed through TestFlight.",
            "The web platform and the admin panel run on AWS EC2, with continuous deployment."
          ]
        }
      },
      "links": []
    },
    {
      "slug": "admin-lotes",
      "title": "Admin Lotes",
      "client": null,
      "platforms": [
        "android",
        "web"
      ],
      "tech": [
        "Kotlin",
        "MVP",
        "Retrofit",
        "Dagger 2",
        "Firebase",
        "Laravel",
        "Vue",
        "MySQL"
      ],
      "image": "/about/projects/app_erp.webp",
      "summary": {
        "es": "Gestión de proyectos inmobiliarios multiempresa, con app de campo para asesores.",
        "en": "Multi-company real-estate management, with a field app for sales reps."
      },
      "case": {
        "es": {
          "context": [
            "Admin Lotes es un sistema de gestión para empresas inmobiliarias que venden lotes."
          ],
          "problem": [
            "Los lotes, contratos y ventas se llevaban en hojas de cálculo, y los asesores en campo no conocían el estado actualizado de cada lote."
          ],
          "solution": [
            "Desde una app Android, los asesores siguen el estado de cada lote mientras están en campo. La plataforma web concentra los contratos, la facturación electrónica y las ventas.",
            "El sistema está organizado por capas, con principios SOLID e inyección de dependencias, para que crezca sin romperse."
          ]
        },
        "en": {
          "context": [
            "Admin Lotes is a management system for real-estate companies that sell land plots."
          ],
          "problem": [
            "Plots, contracts and sales were kept in spreadsheets, and sales reps in the field did not know the current status of each plot."
          ],
          "solution": [
            "From an Android app, sales reps follow the status of each plot while they are in the field. The web platform brings together contracts, electronic invoicing and sales.",
            "The system is organised in layers, with SOLID principles and dependency injection, so it can grow without breaking."
          ]
        }
      },
      "links": []
    },
    {
      "slug": "solti-crm",
      "title": "Solti-CRM",
      "client": null,
      "platforms": [
        "android",
        "web"
      ],
      "tech": [
        "Java",
        "MVC",
        "Volley",
        "Firebase",
        "Laravel",
        "JavaScript",
        "MySQL"
      ],
      "image": "/about/projects/app_crm.webp",
      "summary": {
        "es": "CRM comercial con seguimiento de clientes en pre-venta y post-venta.",
        "en": "Commercial CRM with customer follow-up before and after the sale."
      },
      "case": {
        "es": {
          "context": [
            "Solti-CRM es un CRM para el equipo comercial de una empresa."
          ],
          "problem": [
            "Los vendedores no tenían un registro común de clientes, llamadas y visitas, y el seguimiento después de la venta se perdía."
          ],
          "solution": [
            "La app Android registra a cada cliente con sus llamadas, correos y la ubicación de las visitas, usando los servicios de Google. Desde la web, el equipo sigue cada venta antes y después de cerrarla."
          ]
        },
        "en": {
          "context": [
            "Solti-CRM is a CRM for a company’s sales team."
          ],
          "problem": [
            "Salespeople had no shared record of customers, calls and visits, and follow-up after the sale got lost."
          ],
          "solution": [
            "The Android app records each customer with their calls, emails and visit locations, using Google services. From the web, the team follows every sale before and after it closes."
          ]
        }
      },
      "links": []
    }
  ],
  "services": [
    {
      "title": {
        "es": "Desarrollo web",
        "en": "Web development"
      },
      "desc": {
        "es": "Sitios corporativos, catálogos y tiendas online rápidos, bilingües y preparados para aparecer en Google.",
        "en": "Fast, bilingual corporate sites, catalogues and online stores, ready to show up on Google."
      },
      "items": [
        {
          "es": "Diseño a medida",
          "en": "Custom design"
        },
        {
          "es": "Catálogo o tienda con pagos",
          "en": "Catalogue or store with payments"
        },
        {
          "es": "SEO y analítica",
          "en": "SEO and analytics"
        }
      ]
    },
    {
      "title": {
        "es": "Apps móviles",
        "en": "Mobile apps"
      },
      "desc": {
        "es": "Apps Android e iOS publicadas en las tiendas, nativas o multiplataforma con Kotlin Multiplatform.",
        "en": "Android and iOS apps published on the stores, native or cross-platform with Kotlin Multiplatform."
      },
      "items": [
        {
          "es": "Android e iOS",
          "en": "Android and iOS"
        },
        {
          "es": "Publicación en Play Store y App Store",
          "en": "Publishing on the Play Store and App Store"
        },
        {
          "es": "Mantenimiento y nuevas versiones",
          "en": "Maintenance and new releases"
        }
      ]
    },
    {
      "title": {
        "es": "IA en tus flujos",
        "en": "AI in your workflows"
      },
      "desc": {
        "es": "Automatiza tareas repetitivas conectando modelos de IA a las herramientas que tu equipo ya usa.",
        "en": "Automate repetitive tasks by connecting AI models to the tools your team already uses."
      },
      "items": [
        {
          "es": "Atención por chat y WhatsApp",
          "en": "Chat and WhatsApp support"
        },
        {
          "es": "Lectura de documentos y transcripción",
          "en": "Document reading and transcription"
        },
        {
          "es": "Reportes y tareas automáticas",
          "en": "Automated reports and tasks"
        }
      ]
    }
  ]
};
