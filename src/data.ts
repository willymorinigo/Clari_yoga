/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Review, TeacherInfo } from './types';

export const SERVICES: Service[] = [
  {
    id: 'zen-yoga',
    name: 'Zen Yoga (Shin-Shin-Toitsu-Do)',
    description: 'Práctica tradicional japonesa de coordinación de mente y cuerpo. Combina posturas suaves (Asanas), ejercicios de respiración (Pranayama) y meditación Zen enfocada en el flujo de energía vital (Ki). Ideal para cultivar la calma mental y una postura óptima.',
    category: 'yoga',
    duration: 60,
    price: 3500,
    intensity: 'Suave',
    benefits: [
      'Reduce significativamente el estrés y la ansiedad',
      'Mejora la flexibilidad y la alineación de la columna vertebral',
      'Cultiva la concentración mental a través de la respiración profunda',
      'Armoniza el flujo de energía vital (Ki) y el equilibrio postural'
    ]
  },
  {
    id: 'vinyasa-flow',
    name: 'Vinyasa Flow & Estiramiento Zen',
    description: 'Clase dinámica que conecta el movimiento fluido del cuerpo con la respiración rítmica. Integra transiciones activas enfocadas en la fuerza, flexibilidad y resistencia física, terminando con una relajación profunda en postura Zen.',
    category: 'yoga',
    duration: 75,
    price: 3800,
    intensity: 'Moderada',
    benefits: [
      'Fortalece y tonifica los grupos musculares principales',
      'Aumenta la capacidad cardiovascular y la resistencia física',
      'Desintoxica el organismo mediante la sudoración y respiración activa',
      'Libera las articulaciones y mejora el rango de movimiento corporal'
    ]
  },
  {
    id: 'yin-yoga',
    name: 'Yin Yoga Restaurativo & Meditación',
    description: 'Una práctica de ritmo lento donde las posturas se sostienen pasivamente entre 3 y 5 minutos. Se enfoca en sanar de forma profunda los tejidos conectivos, tendones y fascias, complementado con meditación guiada japonesa.',
    category: 'yoga',
    duration: 60,
    price: 3500,
    intensity: 'Restaurativa',
    benefits: [
      'Alivia dolores crónicos en espalda, cuello y caderas',
      'Estimula y regenera las fascias y articulaciones del cuerpo',
      'Fomenta un profundo estado de meditación y introspección',
      'Ideal para preparar la mente y el cuerpo para un descanso reparador'
    ]
  },
  {
    id: 'shiatsu-tradicional',
    name: 'Shiatsu Tradicional (Acupresión Japonesa)',
    description: 'Terapia física japonesa que utiliza la presión precisa de los pulgares, manos y codos sobre los puntos de acupuntura (Tsubo). Estimula los mecanismos de autocuración innatos del organismo para liberar bloqueos físicos y de tensión acumulada.',
    category: 'shiatsu',
    duration: 60,
    price: 6500,
    intensity: 'Moderada',
    benefits: [
      'Alivia contracturas musculares profundas en espalda y hombros',
      'Estimula la circulación sanguínea y el drenaje linfático',
      'Fortalece el sistema inmunológico y equilibra el sistema nervioso',
      'Corrige contracturas posturales persistentes y alivia dolores de cabeza'
    ]
  },
  {
    id: 'shiatsu-zen',
    name: 'Shiatsu Zen Energético (Masunaga)',
    description: 'Basado en la teoría de los meridianos de la Medicina Tradicional China de amplio desarrollo japonés. Incluye estiramientos suaves, presión rítmica profunda y diagnóstico del Hara (centro abdominal) para equilibrar energéticamente los canales Yin y Yang.',
    category: 'shiatsu',
    duration: 75,
    price: 7500,
    intensity: 'Suave',
    benefits: [
      'Sincroniza y equilibra la energía física, mental y emocional',
      'Ayuda enormemente a regular problemas digestivos e intestinales',
      'Alivia el cansancio crónico y promueve una vitalidad renovada',
      'Genera una sensación de integración y contención interna profunda'
    ]
  },
  {
    id: 'shiatsu-hot-stones',
    name: 'Shiatsu con Piedras Calientes (Ko-Do)',
    description: 'Una fusión celestial del Shiatsu de meridianos corporales con la termoterapia de piedras de basalto calientes de origen volcánico. Las piedras actúan penetrando los tejidos para soltar la rigidez muscular profunda antes de la digitopresión.',
    category: 'shiatsu',
    duration: 90,
    price: 9000,
    intensity: 'Moderada',
    benefits: [
      'Relajación muscular ultra profunda inmediata por calor conductivo',
      'Desintoxicación profunda del cuerpo y eliminación de toxinas',
      'Reduce notablemente el insomnio y promueve el descanso continuo',
      'Proporciona una experiencia de spa de lujo profundamente relajante'
    ]
  },
  {
    id: 'ritual-yin-shiatsu',
    name: 'Ritual Zen (Yin Yoga + Shiatsu Express)',
    description: 'La máxima combinación de bienestar japonés. Disfruta de una inducción de 40 minutos de estiramientos de Yin Yoga guiados para abrir canales de energía, seguido inmediatamente por una sesión terapéutica de Shiatsu de 50 minutos concentrada en la espalda, hombros y rostro.',
    category: 'combo',
    duration: 90,
    price: 9500,
    intensity: 'Restaurativa',
    benefits: [
      'Obtén el beneficio de ambas disciplinas en una sola sesión premium',
      'Apertura mental previa para maximizar los efectos táctiles del masaje',
      'Enfoque completo en el autocuidado integral y conexión corporal',
      'Incluye una infusión de té verde orgánico matcha al finalizar'
    ]
  }
];

export const TEACHERS: TeacherInfo[] = [
  {
    id: 'clara',
    name: 'María Clara Chiaravalli',
    role: 'Profesora de Yoga & Terapeuta Shiatsu • Reiki',
    bio: 'Nací en la ciudad de La Plata, en julio de 1978. Soy diseñadora en comunicación visual e ilustradora. Como profesora de Yoga, comparto toda experiencia y estudio que aporte a la salud y al bienestar. Mi camino comenzó en el año 2005 con la práctica de diversos estilos como vinyasa, yoga integral, ashtanga, yoga terapéutico; y brindo prácticas en mi ciudad natal de manera presencial desde el año 2018. Me formé en Hatha Yoga y Antropotécnica. Soy terapeuta Shiatsu y maestra de Reiki. La práctica que propongo es aquella que tiene como finalidad la autorregulación y el equilibrio, explorando los opuestos complementarios, entre lo dinámico y la quietud. Movilidad, respiración y meditación como medicina para la vida moderna.',
    specialty: 'Hatha Yoga, Vinyasa Flow, Yoga Integral, Terapia Shiatsu y Reiki',
    image: 'https://scontent.cdninstagram.com/v/t51.82787-19/627356089_18035157014765815_8408329830292983365_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=107&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy42NDAuQzMifQ%3D%3D&_nc_ohc=Yf2CQfNGziQQ7kNvwFOcVIV&_nc_oc=AdrXP2Fo4CzpSKwekzfcUV2g31H_aMYu61SFJOTnDoNW5mjuMX5xbvV-Mi_Xg5Z3hnQ&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=JMCjz9fDv9vjMYMQAHUPOA&_nc_ss=7a689&oh=00_Af5EMdLQg4PNGzowEjGYr2t2ZPSp396nRX1DKeuCRQL69g&oe=6A1F6892'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Sofía Martínez',
    text: 'La sesión de Shiatsu con María Clara fue reveladora. Llegué con contracturas crónicas en el cuello debido al estrés laboral y salí sintiéndome liviana, con una sensación de equilibrio y paz absoluta.',
    rating: 5,
    serviceName: 'Shiatsu Tradicional (Acupresión Japonesa)'
  },
  {
    id: 'r2',
    userName: 'Alejandro Rossi',
    text: 'He practicado Yoga en muchos lugares, pero la propuesta de María Clara es diferente. Logra un equilibrio increíble entre lo dinámico y la quietud física, y su respiración y meditación guiadas son medicina real.',
    rating: 5,
    serviceName: 'Vinyasa Flow & Estiramiento Zen'
  },
  {
    id: 'r3',
    userName: 'Mariela Fernández',
    text: 'El Ritual Zen guiado por María Clara es un viaje de autorregulación maravilloso. Combina estiramientos suaves y una profunda relajación que disuelve cualquier tensión del cuerpo. Increíble.',
    rating: 5,
    serviceName: 'Ritual Zen (Yin Yoga + Shiatsu Express)'
  }
];

export const FAQS = [
  {
    q: '¿Qué indumentaria debo llevar para una sesión de Shiatsu?',
    a: 'Para el Shiatsu tradicional se recomienda vestir ropa cómoda, holgada y preferentemente de algodón (como un pantalón largo deportivo y remera de manga larga suave). No se aplica aceite en la piel; la digitopresión se realiza sobre las prendas de vestir.'
  },
  {
    q: '¿Es necesario tener experiencia previa para participar en las clases de Yoga?',
    a: 'En absoluto. Las clases de Zen Yoga y Yin Yoga están estructuradas para dar la bienvenida tanto a personas que realizan su primer contacto espiritual como a practicantes de todos los niveles. Cada postura se adapta a las necesidades anatómicas particulares.'
  },
  {
    q: '¿Qué es el Shiatsu y en qué se diferencia de un masaje común?',
    a: 'El Shiatsu es una disciplina terapéutica manual japonesa homologada por el Ministerio de Salud de Japón. A diferencia del masaje sueco o relajante convencional, no usa aceites ni frotación. Utiliza la presión estática de los dedos y palmas sobre canales energéticos específicos para regular las funciones orgánicas y balancear los flujos del organismo.'
  },
  {
    q: '¿Con cuánta anticipación debo reservar mi turno?',
    a: 'Se recomienda agendar el turno con al menos 24 o 48 horas de anticipación a través de esta plataforma en línea para asegurar los horarios disponibles de preferencia.'
  }
];

export const HOLES_CALENDAR = [
  '09:00', '10:30', '12:00', '14:30', '16:00', '17:30', '19:00'
];
