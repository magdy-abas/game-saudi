export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  image?: string;
  subtitle?: string;
}

export interface Question {
  id: number;
  questionNumberText: string;
  title: string;
  slogan: string;
  options: QuizOption[];
}

export interface Prize {
  id: string;
  title: string;
  badge: string;
  description: string;
  terms: string;
  weight: number;
  image: string;
  isRare?: boolean;
}

// 3 Fixed Questions with Real Food Photography
export const FIXED_QUESTIONS: Question[] = [
  {
    id: 1,
    questionNumberText: "السؤال الأول",
    title: "تعد واحدة من أكلات الملك سلمان المفضلة:",
    slogan: "من نكهة الماضي .. لصناعة مستقبل أجمل",
    options: [
      {
        id: "q1-1",
        text: "المصابيب",
        subtitle: "أقراص عسل وسمن بلدي",
        isCorrect: false,
        image: "/assets/food_masabeeb.webp",
      },
      {
        id: "q1-2",
        text: "المرقوق",
        subtitle: "مرق اللحم والخضار التراثي",
        isCorrect: false,
        image: "/assets/food_margoog.webp",
      },
      {
        id: "q1-3",
        text: "الجريش",
        subtitle: "قمح مهروس مع كشنة وسمن",
        isCorrect: false,
        image: "/assets/food_jareesh.webp",
      },
      {
        id: "q1-4",
        text: "المقشوش",
        subtitle: "حلوى دافئة مقرمشة من الصاج",
        isCorrect: true,
        image: "/assets/food_maqshoosh.webp",
      },
    ],
  },
  {
    id: 2,
    questionNumberText: "السؤال الثاني",
    title: "يعد طبق الحلويات الوطني للمملكة العربية السعودية:",
    slogan: "أكلاتنا .. تجمعنا",
    options: [
      {
        id: "q2-1",
        text: "الكليجا",
        subtitle: "فخر القصيم بالتمر والهيل",
        isCorrect: false,
        image: "/assets/food_kleeja.webp",
      },
      {
        id: "q2-2",
        text: "المقشوش",
        subtitle: "أقراص ذهبية بالسمن والعسل والهيل",
        isCorrect: true,
        image: "/assets/food_maqshoosh.webp",
      },
      {
        id: "q2-3",
        text: "العصيدة",
        subtitle: "دبس التمر والزبدة الفاخرة",
        isCorrect: false,
        image: "/assets/food_aseeda.webp",
      },
      {
        id: "q2-4",
        text: "مصابيب العسل",
        subtitle: "مخبوزات الصاج التراثية",
        isCorrect: false,
        image: "/assets/food_masabeeb.webp",
      },
    ],
  },
  {
    id: 3,
    questionNumberText: "السؤال الثالث",
    title: "لماذا سمي المقشوش بهذا الإسم؟",
    slogan: "الكرم .. من طبعنا",
    options: [
      {
        id: "q3-1",
        text: "لأنه يُقش من الصاج",
        subtitle: "يُقش برفق بعد تحميره الذهبي",
        isCorrect: true,
        image: "/assets/food_saj.webp",
      },
      {
        id: "q3-2",
        text: "لأنه يُؤكل بالقاشوش",
        subtitle: "أداة تناول تراثية قديمة",
        isCorrect: false,
        image: "/assets/food_maqshoosh.webp",
      },
      {
        id: "q3-3",
        text: "نسبةً إلى نوع من التمر",
        subtitle: "أصناف نخيل الجزيرة العربية",
        isCorrect: false,
        image: "/assets/food_kleeja.webp",
      },
      {
        id: "q3-4",
        text: "نسبةً إلى منطقة حائل",
        subtitle: "من عروس الشمال وجبال أجا",
        isCorrect: false,
        image: "/assets/hero_fortress.webp",
      },
    ],
  },
];

export const PRIZE_POOL: Prize[] = [
  {
    id: "mini-maqshoosh",
    title: "مقشوش ميني طازج",
    badge: "هدية اليوم الوطني",
    description: "صحن مقشوش ميني ساخن بالسمن والعسل البلدي مجاناً مع طلبك!",
    terms: "يتم استلام الجائزة مع الطلب داخل الفرع",
    weight: 35,
    image: "/assets/food_maqshoosh.webp",
  },
  {
    id: "free-coffee",
    title: "قهوة سعودية أصيلة",
    badge: "ضيافة رغفان الملكية",
    description: "فنجال قهوة سعودية ملكية بالهيل والزعفران الشقر مجاناً مع طلبك!",
    terms: "صالحة للاستخدام المباشر مع طلبك داخل الفرع",
    weight: 30,
    image: "/assets/food_coffee.webp",
  },
  {
    id: "discount-15",
    title: "خصم 15% على فاتورتك",
    badge: "عرض حصري",
    description: "خصم 15% فوري على إجمالي طلبك داخل فرع رغفان!",
    terms: "تطبق عند الطلب المباشر من الكاشير",
    weight: 20,
    image: "/assets/food_masabeeb.webp",
  },
  {
    id: "credit-96",
    title: "خصم 9.6 ريال على طلبك",
    badge: "احتفال اليوم الوطني",
    description: "خصم 9.6 ريال فورية احتفالاً باليوم الوطني 96 على طلبك القادم!",
    terms: "صالحة للاستخدام لمرة واحدة بالفرع لطلبك اليوم",
    weight: 15,
    image: "/assets/food_maqshoosh.webp",
  },
];

export interface ScoreFeedback {
  percentage: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export function getScoreFeedback(correctCount: number, total: number = 3): ScoreFeedback {
  const percentage = Math.round((correctCount / total) * 100);

  if (percentage >= 90) {
    return {
      percentage: 100,
      title: "سعوديتك 100%",
      subtitle: "علومك غانمة وفالك الطيب!",
      description: "ما شاء الله تبارك الله! خبير في أكلاتنا الشعبية وتراثنا العريق.. سعودي أصيل أباً عن جد وكفو والله!",
      badge: "سعودي أصيل 100%",
    };
  } else if (percentage >= 50) {
    return {
      percentage: 67,
      title: "سعوديتك 67%",
      subtitle: "واضح تحتاج لك كم زيارة لرغفان! 😂",
      description: "ما قصرت وعلومك طيبة! بس يبيلك تروق برغفان وتضبط الجرعة مع مقشوش ومصابيب حارة عشان تقفل الـ 100%!",
      badge: "سعودي على الطريق",
    };
  } else {
    return {
      percentage: 33,
      title: "سعوديتك 33%",
      subtitle: "يبيلك كورس مصابيب ومقشوش على أصوله! 😉",
      description: "ولا يهمك! كل نتيجة اليوم فيها هدية مضمونة من رغفان.. تنورنا بالفرع وتذوق أصالة الأجداد بنفسك!",
      badge: "ضيف رغفان العزيز",
    };
  }
}

// Draw a weighted prize from pool
export function drawPrize(pool: Prize[] = PRIZE_POOL): Prize {
  const totalWeight = pool.reduce((acc, p) => acc + p.weight, 0);
  let random = Math.random() * totalWeight;

  for (const prize of pool) {
    if (random < prize.weight) {
      return prize;
    }
    random -= prize.weight;
  }
  return pool[0];
}

export function generatePromoCode(prize: Prize): string {
  const prefix = prize.isRare ? "RUGHFAN-ROYAL" : "RUGHFAN-96";
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${randomSuffix}`;
}

export interface UserSavedSession {
  customerName: string;
  phoneNumber?: string;
  orderNumber?: string;
  prize: Prize;
  promoCode: string;
  scorePercentage: number;
  correctCount: number;
  completedAt: string;
}
