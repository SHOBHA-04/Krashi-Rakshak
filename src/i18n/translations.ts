import type { Language } from "../types/plant";

export interface UIStrings {
  appName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  navScan: string;
  navHistory: string;
  navHowItWorks: string;
  navAbout: string;
  uploadLeafPhoto: string;
  useCamera: string;
  dragDropHint: string;
  supportedFormats: string;
  retakePhoto: string;
  changePhoto: string;
  analyzeLeaf: string;
  analyzingTitle: string;
  analyzingSubtitle: string;
  tryDemoHeading: string;
  tryDemoSubheading: string;
  demoBadge: string;
  cameraCaptureTitle: string;
  captureNow: string;
  closeCamera: string;
  cameraUnavailable: string;
  statusHealthy: string;
  statusDiseased: string;
  statusUnclear: string;
  severityLabel: string;
  severityLow: string;
  severityMedium: string;
  severityHigh: string;
  confidenceLabel: string;
  cropLabel: string;
  listenAdvice: string;
  stopListening: string;
  voiceUnsupported: string;
  summaryTitle: string;
  affectedAreaTitle: string;
  symptomsTitle: string;
  treatmentTitle: string;
  treatmentNote: string;
  preventionTitle: string;
  feedbackQuestion: string;
  feedbackYes: string;
  feedbackNo: string;
  feedbackThanksYes: string;
  feedbackThanksNo: string;
  downloadImage: string;
  downloadPdf: string;
  shareReport: string;
  shareCopied: string;
  scanAnother: string;
  unclearTitle: string;
  unclearSubtitle: string;
  unclearTipsTitle: string;
  unclearTips: string[];
  disclaimerText: string;
  errorTitle: string;
  offlineError: string;
  timeoutError: string;
  invalidFileType: string;
  fileTooLarge: string;
  retryButton: string;
  historyTitle: string;
  historySubtitle: string;
  historyEmptyTitle: string;
  historyEmptySubtitle: string;
  historyClearAll: string;
  historyConfirmClear: string;
  historyCancel: string;
  historyDelete: string;
  historyViewReport: string;
  historyFeedbackYes: string;
  historyFeedbackNo: string;
  howTitle: string;
  howSubtitle: string;
  howSteps: { title: string; description: string }[];
  cnnTitle: string;
  cnnDescription: string;
  supportedCropsTitle: string;
  supportedCropsSubtitle: string;
  supportedCrops: { en: string; hi: string }[];
  photoTipsTitle: string;
  photoTips: string[];
  aboutTitle: string;
  aboutSubtitle: string;
  projectCardTitle: string;
  createdByLabel: string;
  createdByValue: string;
  instituteLabel: string;
  instituteValue: string;
  trainerLabel: string;
  trainerValue: string;
  missionTitle: string;
  missionBody: string;
  privacyTitle: string;
  privacyBody: string;
}

export const TRANSLATIONS: Record<Language, UIStrings> = {
  en: {
    appName: "FasalVaidya",
    tagline: "Photo lo, bimari pehchano",
    heroTitle: "Instant crop leaf health check for your field",
    heroSubtitle:
      "Take or upload a clear close-up photo of any crop leaf to identify diseases, confidence score, and step-by-step organic and chemical care.",
    navScan: "Scan",
    navHistory: "History",
    navHowItWorks: "How it works",
    navAbout: "About",
    uploadLeafPhoto: "Upload Leaf Photo",
    useCamera: "Use Camera",
    dragDropHint: "Or drag and drop a leaf photo here on desktop",
    supportedFormats: "JPG, PNG, or WebP · Max 5 MB · Auto-compressed for slow networks",
    retakePhoto: "Retake",
    changePhoto: "Change Photo",
    analyzeLeaf: "Analyze Leaf",
    analyzingTitle: "Scanning leaf spots & veins…",
    analyzingSubtitle: "Result in seconds · Checking crop & disease signs",
    tryDemoHeading: "Try a demo leaf",
    tryDemoSubheading: "Test FasalVaidya immediately using sample crop photos",
    demoBadge: "Sample Demo",
    cameraCaptureTitle: "Position a single leaf in bright daylight",
    captureNow: "Capture Photo",
    closeCamera: "Cancel",
    cameraUnavailable: "Camera preview is unavailable here. Opening your device photo picker.",
    statusHealthy: "Healthy Leaf",
    statusDiseased: "Disease Detected",
    statusUnclear: "Unclear Image",
    severityLabel: "Severity",
    severityLow: "Low Severity",
    severityMedium: "Medium Severity",
    severityHigh: "High Severity",
    confidenceLabel: "Confidence",
    cropLabel: "Crop",
    listenAdvice: "Listen",
    stopListening: "Stop Audio",
    voiceUnsupported: "Voice playback is not supported in this browser.",
    summaryTitle: "Diagnosis Summary",
    affectedAreaTitle: "Affected Leaf Area",
    symptomsTitle: "Symptoms Observed",
    treatmentTitle: "Treatment Steps",
    treatmentNote: "Organic and field hygiene steps are listed first, followed by chemical options.",
    preventionTitle: "Prevention Tips",
    feedbackQuestion: "Was this result correct?",
    feedbackYes: "Yes",
    feedbackNo: "No",
    feedbackThanksYes: "Thank you! Marked as accurate.",
    feedbackThanksNo: "Thank you! Marked for review.",
    downloadImage: "Save Image",
    downloadPdf: "Download PDF",
    shareReport: "Share",
    shareCopied: "Report copied to clipboard!",
    scanAnother: "Scan Another Leaf",
    unclearTitle: "Photo clear nahi hai / Not a clear leaf photo",
    unclearSubtitle:
      "We could not clearly see a plant leaf in this photo. Please take a fresh photo using the tips below.",
    unclearTipsTitle: "Tips for an accurate scan",
    unclearTips: [
      "Take the photo in bright natural daylight (avoid harsh shadows or flash glare).",
      "Focus on a single leaf showing the spots or discoloration clearly.",
      "Hold the phone steady for a close-up so leaf veins and spots look sharp.",
      "Use a plain background (ground, palm, or sky) behind the leaf.",
    ],
    disclaimerText:
      "AI suggestions are for guidance only. Please consult your local agriculture officer (KVK) before applying pesticides, and always follow label instructions.",
    errorTitle: "Could not analyze photo",
    offlineError: "No internet connection detected. Please check your mobile data or Wi-Fi and try again.",
    timeoutError: "The request took too long on the network. Please retry.",
    invalidFileType: "Please select a JPG, PNG, or WebP photo.",
    fileTooLarge: "Photo is larger than 5 MB. Please choose a smaller photo.",
    retryButton: "Retry Analysis",
    historyTitle: "Recent Leaf Scans",
    historySubtitle: "Last 20 scans saved privately on your phone",
    historyEmptyTitle: "No scans saved yet",
    historyEmptySubtitle:
      "Your analyzed crop leaf reports and feedback will appear here for quick offline reference.",
    historyClearAll: "Clear History",
    historyConfirmClear: "Confirm Clear",
    historyCancel: "Cancel",
    historyDelete: "Delete",
    historyViewReport: "View Report",
    historyFeedbackYes: "Farmer confirmed: Correct",
    historyFeedbackNo: "Farmer noted: Incorrect",
    howTitle: "How FasalVaidya Works",
    howSubtitle: "From leaf photo to actionable field advice in four simple steps",
    howSteps: [
      {
        title: "1. Upload or Capture Leaf Photo",
        description:
          "Take a close-up daylight photo of a single leaf. Your phone automatically compresses the image to save mobile data.",
      },
      {
        title: "2. AI Vision Analysis",
        description:
          "Our vision AI inspects leaf color, spot shapes, concentric rings, fungal powder, and edge necrosis.",
      },
      {
        title: "3. Disease & Confidence Score",
        description:
          "You receive the crop name, disease diagnosis, severity level, and an accuracy confidence percentage.",
      },
      {
        title: "4. Simple Treatment & Voice Advice",
        description:
          "Read or listen in Hindi or English to organic remedies first, followed by safe chemical dosage guidance.",
      },
    ],
    cnnTitle: "Note on CNN-Based Image Classification",
    cnnDescription:
      "Plant leaf disease detection systems use Convolutional Neural Networks (CNNs) and deep vision architectures trained on thousands of labeled leaf photographs (such as the PlantVillage dataset across 10+ major crops). Convolutional layers automatically extract visual features—like Early Blight target rings, Late Blight water-soaked margins, or healthy uniform chlorophyll—to classify crop health rapidly without needing lab equipment.",
    supportedCropsTitle: "Primary Supported Crops",
    supportedCropsSubtitle:
      "Optimized for key crops below, while also supporting other fruits, vegetables, and field crops:",
    supportedCrops: [
      { en: "Tomato", hi: "टमाटर" },
      { en: "Potato", hi: "आलू" },
      { en: "Apple", hi: "सेब" },
      { en: "Corn (Maize)", hi: "मक्का" },
      { en: "Grape", hi: "अंगूर" },
      { en: "Bell Pepper / Chilli", hi: "शिमला मिर्च / मिर्च" },
      { en: "Strawberry", hi: "स्ट्रॉबेरी" },
      { en: "Peach", hi: "आड़ू" },
      { en: "Cherry", hi: "चेरी" },
      { en: "Soybean", hi: "सोयाबीन" },
    ],
    photoTipsTitle: "Best Photo Guidelines",
    photoTips: [
      "Good morning or afternoon daylight works best.",
      "Keep one single leaf centered in the frame.",
      "Capture both healthy green tissue and diseased spots.",
      "Place a plain hand, soil, or paper behind the leaf.",
    ],
    aboutTitle: "About FasalVaidya",
    aboutSubtitle: "AI Plant Disease Detection System for Small & Marginal Indian Farmers",
    projectCardTitle: "Academic & Project Credits",
    createdByLabel: "Project By",
    createdByValue: "Shobha Bharti",
    instituteLabel: "Trade & Institute",
    instituteValue: "IT-CITS, NSTI Kanpur",
    trainerLabel: "Trainer / Mentor",
    trainerValue: "Mohammad Kashif Siddiqui",
    missionTitle: "Built for Rural Accessibility",
    missionBody:
      "Crop diseases can destroy a season's harvest within days if not recognized early. FasalVaidya empowers small and marginal farmers with instant bilingual diagnosis, voice-assisted guidance, organic-first remedies, and low-data photo compression right from a standard smartphone.",
    privacyTitle: "Farmer Data & Privacy",
    privacyBody:
      "Your scan history and accuracy feedback are stored locally on your own device (localStorage) for offline viewing, so you can revisit past advice anytime without extra data usage.",
  },
  hi: {
    appName: "फ़सलवैद्य",
    tagline: "फोटो लो, बीमारी पहचानो",
    heroTitle: "अपनी फसल की पत्ती की तुरंत जांच करें",
    heroSubtitle:
      "किसी भी फसल की पत्ती की साफ नजदीकी फोटो लें या अपलोड करें और रोग का नाम, सटीकता प्रतिशत और जैविक व रासायनिक उपचार जानें।",
    navScan: "स्कैन",
    navHistory: "इतिहास",
    navHowItWorks: "कैसे काम करता है",
    navAbout: "परिचय",
    uploadLeafPhoto: "पत्ती की फोटो अपलोड करें",
    useCamera: "कैमरा चलाएं",
    dragDropHint: "या कंप्यूटर पर पत्ती की फोटो यहाँ खींचकर छोड़ें",
    supportedFormats: "JPG, PNG या WebP · अधिकतम 5 MB · कम डेटा के लिए स्वतः छोटा होगा",
    retakePhoto: "दूसरी फोटो लें",
    changePhoto: "फोटो बदलें",
    analyzeLeaf: "पत्ती की जांच करें",
    analyzingTitle: "पत्ती के दाग और नसों की जांच हो रही है…",
    analyzingSubtitle: "कुछ ही सेकंड में परिणाम · फसल और बीमारी की पहचान",
    tryDemoHeading: "डेमो पत्ती आज़माएं",
    tryDemoSubheading: "बिना फोटो अपलोड किए नमूना पत्तियों से तुरंत जांच देखें",
    demoBadge: "डेमो नमूना",
    cameraCaptureTitle: "साफ दिन की रोशनी में एक पत्ती को सामने रखें",
    captureNow: "फोटो खींचें",
    closeCamera: "बंद करें",
    cameraUnavailable: "सीधा कैमरा प्रीव्यू उपलब्ध नहीं है। फोन की फोटो गैलरी/कैमरा खुल रहा है।",
    statusHealthy: "स्वस्थ पत्ती",
    statusDiseased: "रोग पाया गया",
    statusUnclear: "फोटो साफ नहीं है",
    severityLabel: "गंभीरता",
    severityLow: "कम गंभीरता",
    severityMedium: "मध्यम गंभीरता",
    severityHigh: "अधिक गंभीरता",
    confidenceLabel: "सटीकता",
    cropLabel: "फसल",
    listenAdvice: "सुनें",
    stopListening: "आवाज़ रोकें",
    voiceUnsupported: "इस ब्राउज़र में बोलकर सुनाने की सुविधा उपलब्ध नहीं है।",
    summaryTitle: "जांच का सारांश",
    affectedAreaTitle: "प्रभावित हिस्सा",
    symptomsTitle: "दिखे लक्षण",
    treatmentTitle: "उपचार के कदम",
    treatmentNote: "पहले जैविक और घरेलू उपाय दिए गए हैं, उसके बाद रासायनिक दवा की जानकारी है।",
    preventionTitle: "रोकथाम के सुझाव",
    feedbackQuestion: "क्या यह परिणाम सही था?",
    feedbackYes: "हाँ, सही था",
    feedbackNo: "नहीं, गलत था",
    feedbackThanksYes: "धन्यवाद! आपने सही बताया।",
    feedbackThanksNo: "धन्यवाद! आपका फीडबैक सुरक्षित कर लिया गया है।",
    downloadImage: "फोटो सेव करें",
    downloadPdf: "PDF डाउनलोड",
    shareReport: "शेयर करें",
    shareCopied: "रिपोर्ट कॉपी हो गई!",
    scanAnother: "दूसरी पत्ती जांचें",
    unclearTitle: "फोटो साफ नहीं है / पत्ता स्पष्ट नहीं दिख रहा",
    unclearSubtitle:
      "इस फोटो में पौधे की पत्ती साफ दिखाई नहीं दे रही है। कृपया नीचे दिए सुझावों के अनुसार नई फोटो लें।",
    unclearTipsTitle: "सही जांच के लिए सुझाव",
    unclearTips: [
      "तेज़ धूप की चमक या अंधेरे के बिना साफ दिन के उजाले में फोटो लें।",
      "केवल एक पत्ती पर ध्यान केंद्रित करें जिस पर दाग या पीलापन दिख रहा हो।",
      "फोन को स्थिर रखकर पास से साफ (ब्लर-रहित) फोटो खींचें।",
      "पत्ती के पीछे सादा बैकग्राउंड (ज़मीन, हथेली या सादा कागज़) रखें।",
    ],
    disclaimerText:
      "AI द्वारा दिए गए सुझाव केवल मार्गदर्शन के लिए हैं। किसी भी कीटनाशक या फफूंदनाशी का छिड़काव करने से पहले अपने नजदीकी कृषि विज्ञान केंद्र (KVK) या कृषि अधिकारी से सलाह लें और डिब्बे पर लिखे निर्देशों का पालन करें।",
    errorTitle: "फोटो की जांच नहीं हो सकी",
    offlineError: "इंटरनेट कनेक्शन नहीं है। कृपया मोबाइल डेटा या वाई-फाई जांचें और फिर प्रयास करें।",
    timeoutError: "नेटवर्क धीमा होने के कारण समय अधिक लगा। कृपया पुनः प्रयास करें।",
    invalidFileType: "कृपया केवल JPG, PNG या WebP फोटो ही चुनें।",
    fileTooLarge: "फोटो 5 MB से बड़ी है। कृपया छोटी फोटो चुनें।",
    retryButton: "पुनः प्रयास करें",
    historyTitle: "पिछली जांचें",
    historySubtitle: "पिछले 20 स्कैन आपके फोन में सुरक्षित हैं",
    historyEmptyTitle: "अभी कोई जांच सुरक्षित नहीं है",
    historyEmptySubtitle:
      "आपकी जांची गई पत्तियों की रिपोर्ट और सुझाव यहाँ सेव रहेंगे ताकि आप बिना इंटरनेट के भी देख सकें।",
    historyClearAll: "इतिहास मिटाएं",
    historyConfirmClear: "पुष्टि करें",
    historyCancel: "रद्द करें",
    historyDelete: "हटाएं",
    historyViewReport: "रिपोर्ट देखें",
    historyFeedbackYes: "किसान ने सही बताया",
    historyFeedbackNo: "किसान ने गलत बताया",
    howTitle: "फ़सलवैद्य कैसे काम करता है",
    howSubtitle: "पत्ती की फोटो से लेकर सही उपचार तक चार आसान कदम",
    howSteps: [
      {
        title: "1. पत्ती की फोटो लें या अपलोड करें",
        description:
          "एक पत्ती की साफ फोटो लें। मोबाइल डेटा बचाने के लिए फोटो अपने आप हल्की और छोटी हो जाती है।",
      },
      {
        title: "2. AI विज़न जांच",
        description:
          "हमारा AI मॉडल पत्ती के रंग, गोल धब्बों, सफेद फफूंद और किनारों के सूखने की बारीकी से जांच करता है।",
      },
      {
        title: "3. रोग और सटीकता स्कोर",
        description:
          "आपको फसल का नाम, रोग की पहचान, गंभीरता स्तर और सटीकता प्रतिशत तुरंत मिलता है।",
      },
      {
        title: "4. सरल उपचार और आवाज़ में सलाह",
        description:
          "हिंदी या अंग्रेज़ी में पहले जैविक उपाय और फिर सुरक्षित रासायनिक दवा की जानकारी पढ़ें या सुनें।",
      },
    ],
    cnnTitle: "CNN आधारित इमेज क्लासिफिकेशन की जानकारी",
    cnnDescription:
      "पौधों के रोग पहचानने वाले आधुनिक सिस्टम कन्वोल्यूशनल न्यूरल नेटवर्क (CNN) और विज़न AI तकनीक का उपयोग करते हैं, जिन्हें PlantVillage जैसे हजारों प्रमाणित पत्ती चित्रों पर प्रशिक्षित किया गया है। ये नेटवर्क बिना प्रयोगशाला के पत्ती के धब्बों, पीलेपन और किनारों के पैटर्न से रोग की पहचान करते हैं।",
    supportedCropsTitle: "प्रमुख समर्थित फसलें",
    supportedCropsSubtitle:
      "इन प्रमुख फसलों के साथ-साथ अन्य सब्जियों, फलों और अनाज की पत्तियों की भी जांच की जाती है:",
    supportedCrops: [
      { en: "Tomato", hi: "टमाटर" },
      { en: "Potato", hi: "आलू" },
      { en: "Apple", hi: "सेब" },
      { en: "Corn", hi: "मक्का" },
      { en: "Grape", hi: "अंगूर" },
      { en: "Pepper", hi: "मिर्च / शिमला मिर्च" },
      { en: "Strawberry", hi: "स्ट्रॉबेरी" },
      { en: "Peach", hi: "आड़ू" },
      { en: "Cherry", hi: "चेरी" },
      { en: "Soybean", hi: "सोयाबीन" },
    ],
    photoTipsTitle: "अच्छी फोटो लेने के नियम",
    photoTips: [
      "सुबह या दोपहर की साफ प्राकृतिक रोशनी में फोटो लें।",
      "फ्रेम के बीच में केवल एक ही पत्ती रखें।",
      "पत्ती का स्वस्थ हरा हिस्सा और रोग वाला हिस्सा दोनों दिखने दें।",
      "पत्ती के पीछे सादा हाथ, मिट्टी या कागज़ रखें।",
    ],
    aboutTitle: "फ़सलवैद्य के बारे में",
    aboutSubtitle: "छोटे और सीमांत भारतीय किसानों के लिए AI पौधा रोग पहचान प्रणाली",
    projectCardTitle: "परियोजना और प्रशिक्षण विवरण",
    createdByLabel: "प्रोजेक्ट निर्माता",
    createdByValue: "शोभा भारती (Shobha Bharti)",
    instituteLabel: "ट्रेड एवं संस्थान",
    instituteValue: "IT-CITS, NSTI कानपुर",
    trainerLabel: "प्रशिक्षक / मार्गदर्शक",
    trainerValue: "मोहम्मद काशिफ सिद्दीकी (Mohammad Kashif Siddiqui)",
    missionTitle: "किसानों की सहायता के लिए निर्मित",
    missionBody:
      "समय पर रोग की पहचान न होने पर फसल को भारी नुकसान हो सकता है। फ़सलवैद्य किसानों को अपनी भाषा हिंदी और अंग्रेज़ी में तुरंत पत्ती जांच, बोलकर सुनाने वाली सलाह, जैविक उपचार और कम डेटा में काम करने की सुविधा देता है।",
    privacyTitle: "डेटा और गोपनीयता",
    privacyBody:
      "आपकी पिछली जांच और फीडबैक केवल आपके अपने फोन के लोकल स्टोरेज में सेव रहते हैं ताकि आप बिना इंटरनेट के भी पुराने उपचार देख सकें।",
  },
};
