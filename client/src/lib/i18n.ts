// Define types for our translations
export type TranslationKey = 
  | "Dashboard" 
  | "Accounts" 
  | "Savings" 
  | "Investments" 
  | "Spend/Rewards" 
  | "Learn" 
  | "Settings"
  | "Sign In"
  | "Welcome"
  | "Did you know you can earn rewards with every spend?"
  | "Total Balance"
  | "annualized return"
  | "today"
  | "Last earned"
  | "Today"
  | "Rewards"
  | "Sign In"
  | "Sign in to view your balance and account information"
  | "Recent Activity"
  | "Sign in to view your recent activity"
  | "View on Explorer"
  | "reward"
  | "View All Transactions"
  | "Quick Actions"
  | "Deposit Funds"
  | "View Portfolio"
  | "Explore Investments"
  | "Wallet Not Connected"
  | "Please connect your wallet first"
  | "Deposit Initiated"
  | "Preparing deposit process..."
  | "Notifications"
  | "New"
  | "New sukuk asset listed!"
  | "A new Sharia-compliant sukuk has been added to the investment marketplace."
  | "Savings profit distributed"
  | "Your quarterly profit-sharing distribution has been processed."
  | "New educational content"
  | "Learn about Mudarabah contracts in our latest article."
  | "View Details"
  | "Read Now"
  | "View All Notifications"
  | "Featured Investment Options"
  | "View All"
  | "Real Estate Sukuk"
  | "Sharia-compliant investment in commercial real estate properties."
  | "AAOIFI-Compliant"
  | "Ethical Tech Fund"
  | "Diversified portfolio of ethical technology companies."
  | "Sharia-Compliant"
  | "Halal SME Financing"
  | "Support small businesses with Sharia-compliant financing."
  | "Mudarabah-Based"
  | "Expected Return"
  | "Risk Level"
  | "Low-Medium"
  | "Medium"
  | "Medium-High"
  | "Learn More"
  | "About This Investment"
  | "Performance"
  | "Performance chart placeholder"
  | "Invest"
  | "Amount (SOL)"
  | "Expected Annual Return"
  | "Based on"
  | "annual rate"
  | "Invest Now"
  | "Invalid Amount"
  | "Please enter a valid investment amount"
  | "Investment Initiated"
  | "Processing your investment request..."
  | "Investment Successful"
  | "Your investment has been processed successfully"
  | "Islamic Finance Basics"
  | "Understanding Mudarabah"
  | "Mudarabah is a profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while losses are borne by the capital provider only."
  | "Key Distinction from Conventional Finance"
  | "Unlike interest-based investments, Mudarabah distributes actual profits, not predetermined returns, making it Sharia-compliant."
  | "Read Full Article"
  | "Related Learning Resources"
  | "Introduction to Sukuk - 3 min video"
  | "Halal vs Haram Investments Guide"
  | "Islamic Finance FAQ"
  | "Blockchain and Sharia Compliance"
  | "Explore Learning Center"
  | "Connect Your Wallet"
  | "Connect your wallet to access Tahara's Sharia-compliant financial services."
  | "Connect with Privy"
  | "Phantom Wallet"
  | "Solflare Wallet"
  | "New to Solana and crypto wallets?"
  | "Learn how to set up a wallet"
  | "Wallet Connected"
  | "Your wallet has been connected successfully."
  | "Connection Failed"
  | "Failed to connect wallet. Please try again."
  | "Please connect your wallet to invest"
  | "Deposited SOL"
  | "Invested in Sukuk Fund"
  | "Halal Grocery Purchase"
  | "Savings Deposit"
  | "Savings Profit Distribution"
  | "Successful"
  | "Completed";

// English translations
const enTranslations: Record<TranslationKey, string> = {
  "Dashboard": "Dashboard",
  "Accounts": "Accounts",
  "Savings": "Savings",
  "Investments": "Investments",
  "Spend/Rewards": "Spend/Rewards",
  "Learn": "Learn",
  "Settings": "Settings",
  "Sign In": "Sign In",
  "Welcome": "Welcome",
  "Did you know you can earn rewards with every spend?": "Did you know you can earn rewards with every spend?",
  "Total Balance": "Total Balance",
  "annualized return": "annualized return",
  "today": "today",
  "Last earned": "Last earned",
  "Today": "Today",
  "Rewards": "Rewards",
  "Connect Your Wallet": "Connect Your Wallet",
  "Connect your wallet to view your balance and account information": "Connect your wallet to view your balance and account information",
  "Recent Activity": "Recent Activity",
  "Connect your wallet to view your recent activity": "Connect your wallet to view your recent activity",
  "View on Explorer": "View on Explorer",
  "reward": "reward",
  "View All Transactions": "View All Transactions",
  "Quick Actions": "Quick Actions",
  "Deposit Funds": "Deposit Funds",
  "View Portfolio": "View Portfolio",
  "Explore Investments": "Explore Investments",
  "Wallet Not Connected": "Wallet Not Connected",
  "Please connect your wallet first": "Please connect your wallet first",
  "Deposit Initiated": "Deposit Initiated",
  "Preparing deposit process...": "Preparing deposit process...",
  "Notifications": "Notifications",
  "New": "New",
  "New sukuk asset listed!": "New sukuk asset listed!",
  "A new Sharia-compliant sukuk has been added to the investment marketplace.": "A new Sharia-compliant sukuk has been added to the investment marketplace.",
  "Savings profit distributed": "Savings profit distributed",
  "Your quarterly profit-sharing distribution has been processed.": "Your quarterly profit-sharing distribution has been processed.",
  "New educational content": "New educational content",
  "Learn about Mudarabah contracts in our latest article.": "Learn about Mudarabah contracts in our latest article.",
  "View Details": "View Details",
  "Read Now": "Read Now",
  "View All Notifications": "View All Notifications",
  "Featured Investment Options": "Featured Investment Options",
  "View All": "View All",
  "Real Estate Sukuk": "Real Estate Sukuk",
  "Sharia-compliant investment in commercial real estate properties.": "Sharia-compliant investment in commercial real estate properties.",
  "AAOIFI-Compliant": "AAOIFI-Compliant",
  "Ethical Tech Fund": "Ethical Tech Fund",
  "Diversified portfolio of ethical technology companies.": "Diversified portfolio of ethical technology companies.",
  "Sharia-Compliant": "Sharia-Compliant",
  "Halal SME Financing": "Halal SME Financing",
  "Support small businesses with Sharia-compliant financing.": "Support small businesses with Sharia-compliant financing.",
  "Mudarabah-Based": "Mudarabah-Based",
  "Expected Return": "Expected Return",
  "Risk Level": "Risk Level",
  "Low-Medium": "Low-Medium",
  "Medium": "Medium",
  "Medium-High": "Medium-High",
  "Learn More": "Learn More",
  "About This Investment": "About This Investment",
  "Performance": "Performance",
  "Performance chart placeholder": "Performance chart placeholder",
  "Invest": "Invest",
  "Amount (SOL)": "Amount (SOL)",
  "Expected Annual Return": "Expected Annual Return",
  "Based on": "Based on",
  "annual rate": "annual rate",
  "Invest Now": "Invest Now",
  "Invalid Amount": "Invalid Amount",
  "Please enter a valid investment amount": "Please enter a valid investment amount",
  "Investment Initiated": "Investment Initiated",
  "Processing your investment request...": "Processing your investment request...",
  "Investment Successful": "Investment Successful",
  "Your investment has been processed successfully": "Your investment has been processed successfully",
  "Islamic Finance Basics": "Islamic Finance Basics",
  "Understanding Mudarabah": "Understanding Mudarabah",
  "Mudarabah is a profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while losses are borne by the capital provider only.": "Mudarabah is a profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while losses are borne by the capital provider only.",
  "Key Distinction from Conventional Finance": "Key Distinction from Conventional Finance",
  "Unlike interest-based investments, Mudarabah distributes actual profits, not predetermined returns, making it Sharia-compliant.": "Unlike interest-based investments, Mudarabah distributes actual profits, not predetermined returns, making it Sharia-compliant.",
  "Read Full Article": "Read Full Article",
  "Related Learning Resources": "Related Learning Resources",
  "Introduction to Sukuk - 3 min video": "Introduction to Sukuk - 3 min video",
  "Halal vs Haram Investments Guide": "Halal vs Haram Investments Guide",
  "Islamic Finance FAQ": "Islamic Finance FAQ",
  "Blockchain and Sharia Compliance": "Blockchain and Sharia Compliance",
  "Explore Learning Center": "Explore Learning Center",
  "Connect your wallet to access Tahara's Sharia-compliant financial services.": "Connect your wallet to access Tahara's Sharia-compliant financial services.",
  "Connect with Privy": "Connect with Privy",
  "Phantom Wallet": "Phantom Wallet",
  "Solflare Wallet": "Solflare Wallet",
  "New to Solana and crypto wallets?": "New to Solana and crypto wallets?",
  "Learn how to set up a wallet": "Learn how to set up a wallet",
  "Wallet Connected": "Wallet Connected",
  "Your wallet has been connected successfully.": "Your wallet has been connected successfully.",
  "Connection Failed": "Connection Failed",
  "Failed to connect wallet. Please try again.": "Failed to connect wallet. Please try again.",
  "Please connect your wallet to invest": "Please connect your wallet to invest",
  "Deposited SOL": "Deposited SOL",
  "Invested in Sukuk Fund": "Invested in Sukuk Fund",
  "Halal Grocery Purchase": "Halal Grocery Purchase",
  "Savings Deposit": "Savings Deposit",
  "Savings Profit Distribution": "Savings Profit Distribution",
  "Successful": "Successful",
  "Completed": "Completed"
};

// Arabic translations
const arTranslations: Record<TranslationKey, string> = {
  "Dashboard": "لوحة التحكم",
  "Accounts": "الحسابات",
  "Savings": "المدخرات",
  "Investments": "الاستثمارات",
  "Spend/Rewards": "الإنفاق/المكافآت",
  "Learn": "تعلم",
  "Settings": "الإعدادات",
  "Sign In": "تسجيل الدخول",
  "Welcome": "مرحباً",
  "Did you know you can earn rewards with every spend?": "هل تعلم أنك يمكن أن تكسب مكافآت مع كل عملية إنفاق؟",
  "Total Balance": "الرصيد الإجمالي",
  "annualized return": "العائد السنوي",
  "today": "اليوم",
  "Last earned": "آخر مكافأة",
  "Today": "اليوم",
  "Rewards": "المكافآت",
  "Connect Your Wallet": "ربط محفظتك",
  "Connect your wallet to view your balance and account information": "قم بربط محفظتك لعرض رصيدك ومعلومات حسابك",
  "Recent Activity": "النشاط الأخير",
  "Connect your wallet to view your recent activity": "قم بربط محفظتك لعرض نشاطك الأخير",
  "View on Explorer": "عرض في المستكشف",
  "reward": "مكافأة",
  "View All Transactions": "عرض جميع المعاملات",
  "Quick Actions": "إجراءات سريعة",
  "Deposit Funds": "إيداع الأموال",
  "View Portfolio": "عرض المحفظة",
  "Explore Investments": "استكشاف الاستثمارات",
  "Wallet Not Connected": "المحفظة غير متصلة",
  "Please connect your wallet first": "يرجى ربط محفظتك أولاً",
  "Deposit Initiated": "بدأت عملية الإيداع",
  "Preparing deposit process...": "جارٍ تحضير عملية الإيداع...",
  "Notifications": "الإشعارات",
  "New": "جديد",
  "New sukuk asset listed!": "تم إدراج أصل صكوك جديد!",
  "A new Sharia-compliant sukuk has been added to the investment marketplace.": "تمت إضافة صكوك متوافقة مع الشريعة الإسلامية جديدة إلى سوق الاستثمار.",
  "Savings profit distributed": "تم توزيع أرباح المدخرات",
  "Your quarterly profit-sharing distribution has been processed.": "تمت معالجة توزيع المشاركة في الأرباح الربع سنوية.",
  "New educational content": "محتوى تعليمي جديد",
  "Learn about Mudarabah contracts in our latest article.": "تعرف على عقود المضاربة في أحدث مقالاتنا.",
  "View Details": "عرض التفاصيل",
  "Read Now": "اقرأ الآن",
  "View All Notifications": "عرض جميع الإشعارات",
  "Featured Investment Options": "خيارات الاستثمار المميزة",
  "View All": "عرض الكل",
  "Real Estate Sukuk": "صكوك العقارات",
  "Sharia-compliant investment in commercial real estate properties.": "استثمار متوافق مع الشريعة الإسلامية في العقارات التجارية.",
  "AAOIFI-Compliant": "متوافق مع معايير AAOIFI",
  "Ethical Tech Fund": "صندوق التكنولوجيا الأخلاقية",
  "Diversified portfolio of ethical technology companies.": "محفظة متنوعة من شركات التكنولوجيا الأخلاقية.",
  "Sharia-Compliant": "متوافق مع الشريعة",
  "Halal SME Financing": "تمويل الشركات الصغيرة والمتوسطة الحلال",
  "Support small businesses with Sharia-compliant financing.": "دعم الشركات الصغيرة بتمويل متوافق مع الشريعة الإسلامية.",
  "Mudarabah-Based": "مبني على المضاربة",
  "Expected Return": "العائد المتوقع",
  "Risk Level": "مستوى المخاطرة",
  "Low-Medium": "منخفض-متوسط",
  "Medium": "متوسط",
  "Medium-High": "متوسط-مرتفع",
  "Learn More": "معرفة المزيد",
  "About This Investment": "حول هذا الاستثمار",
  "Performance": "الأداء",
  "Performance chart placeholder": "مخطط الأداء",
  "Invest": "استثمر",
  "Amount (SOL)": "المبلغ (SOL)",
  "Expected Annual Return": "العائد السنوي المتوقع",
  "Based on": "بناءً على",
  "annual rate": "معدل سنوي",
  "Invest Now": "استثمر الآن",
  "Invalid Amount": "مبلغ غير صالح",
  "Please enter a valid investment amount": "يرجى إدخال مبلغ استثمار صالح",
  "Investment Initiated": "بدأ الاستثمار",
  "Processing your investment request...": "جارٍ معالجة طلب الاستثمار الخاص بك...",
  "Investment Successful": "نجاح الاستثمار",
  "Your investment has been processed successfully": "تمت معالجة استثمارك بنجاح",
  "Islamic Finance Basics": "أساسيات التمويل الإسلامي",
  "Understanding Mudarabah": "فهم المضاربة",
  "Mudarabah is a profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides expertise (Mudarib). Profits are shared according to a pre-agreed ratio, while losses are borne by the capital provider only.": "المضاربة هي شراكة في تقاسم الأرباح حيث يقدم طرف رأس المال (رب المال) ويقدم الآخر الخبرة (المضارب). يتم تقاسم الأرباح وفقًا لنسبة متفق عليها مسبقًا، بينما يتحمل مقدم رأس المال الخسائر فقط.",
  "Key Distinction from Conventional Finance": "التمييز الرئيسي عن التمويل التقليدي",
  "Unlike interest-based investments, Mudarabah distributes actual profits, not predetermined returns, making it Sharia-compliant.": "على عكس الاستثمارات القائمة على الفائدة، توزع المضاربة الأرباح الفعلية، وليس العوائد المحددة مسبقًا، مما يجعلها متوافقة مع الشريعة الإسلامية.",
  "Read Full Article": "قراءة المقال كاملاً",
  "Related Learning Resources": "موارد تعليمية ذات صلة",
  "Introduction to Sukuk - 3 min video": "مقدمة عن الصكوك - فيديو 3 دقائق",
  "Halal vs Haram Investments Guide": "دليل الاستثمارات الحلال مقابل الحرام",
  "Islamic Finance FAQ": "الأسئلة الشائعة حول التمويل الإسلامي",
  "Blockchain and Sharia Compliance": "البلوكتشين والامتثال للشريعة",
  "Explore Learning Center": "استكشاف مركز التعلم",
  "Connect your wallet to access Tahara's Sharia-compliant financial services.": "قم بربط محفظتك للوصول إلى الخدمات المالية المتوافقة مع الشريعة الإسلامية من طهارة.",
  "Connect with Privy": "الاتصال عبر Privy",
  "Phantom Wallet": "محفظة Phantom",
  "Solflare Wallet": "محفظة Solflare",
  "New to Solana and crypto wallets?": "هل أنت جديد على Solana ومحافظ العملات المشفرة؟",
  "Learn how to set up a wallet": "تعلم كيفية إعداد محفظة",
  "Wallet Connected": "تم ربط المحفظة",
  "Your wallet has been connected successfully.": "تم ربط محفظتك بنجاح.",
  "Connection Failed": "فشل الاتصال",
  "Failed to connect wallet. Please try again.": "فشل ربط المحفظة. يرجى المحاولة مرة أخرى.",
  "Please connect your wallet to invest": "يرجى ربط محفظتك للاستثمار",
  "Deposited SOL": "تم إيداع SOL",
  "Invested in Sukuk Fund": "استثمار في صندوق الصكوك",
  "Halal Grocery Purchase": "شراء بقالة حلال",
  "Savings Deposit": "إيداع مدخرات",
  "Savings Profit Distribution": "توزيع أرباح المدخرات",
  "Successful": "ناجح",
  "Completed": "مكتمل"
};

// Main translation function
export const getTranslation = (key: TranslationKey, language: "en" | "ar"): string => {
  const translations = language === "en" ? enTranslations : arTranslations;
  return translations[key] || key;
};
