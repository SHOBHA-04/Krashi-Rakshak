import type { DemoSample } from "../types/plant";

export const HERO_FIELD_IMAGE = "/src/assets/images/hero_indian_crop_field_1794891831889.jpg";
export const FARMER_SCAN_IMAGE = "/src/assets/images/farmer_mobile_scan_1794983613215.jpg";

export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: "demo-tomato-early-blight",
    imageUrl: "/src/assets/images/demo_tomato_early_blight_1794891830671.jpg",
    labelEn: "Tomato · Early Blight",
    labelHi: "टमाटर · अगेती झुलसा",
    subtitleEn: "94.2% confidence · Medium severity",
    subtitleHi: "94.2% सटीकता · मध्यम गंभीरता",
    result: {
      crop_name: "Tomato",
      crop_name_hi: "टमाटर",
      status: "Diseased",
      disease_name: "Early Blight (Alternaria solani)",
      disease_name_hi: "अगेती झुलसा रोग (Early Blight)",
      confidence: 94.2,
      severity: "Medium",
      affected_area_description:
        "Middle and lower leaf blade showing 2–4 circular dark lesions surrounded by yellow halos.",
      affected_area_description_hi:
        "पत्ती के बीच और निचले हिस्से में पीले घेरे के साथ 2–4 गोल गहरे भूरे धब्बे दिख रहे हैं।",
      symptoms_observed: [
        "Dark brown spots with clear concentric target-like rings.",
        "Yellowing halo spreading around older lesions.",
        "Lower older leaves typically show spots first.",
      ],
      symptoms_observed_hi: [
        "पत्ती पर गोल चकरी जैसे गहरे भूरे धब्बे (Target rings)।",
        "धब्बों के चारों ओर पीलापन फैल रहा है।",
        "आमतौर पर पौधे की निचली पुरानी पत्तियों पर पहले असर दिखता है।",
      ],
      treatment: [
        "Pluck and safely destroy heavily infected lower leaves away from the field.",
        "Organic: Spray Neem oil (3–5 ml per litre water) or Trichoderma viride bio-fungicide early morning.",
        "Organic: Use copper oxychloride (organic-approved dose) if humidity stays high.",
        "Chemical: If spread continues, spray Mancozeb 75% WP or Azoxystrobin strictly following the label dosage.",
      ],
      treatment_hi: [
        "अधिक संक्रमित निचली पत्तियों को तोड़कर खेत से दूर नष्ट करें।",
        "जैविक: सुबह के समय नीम का तेल (3–5 मिली प्रति लीटर पानी) या ट्राइकोडर्मा का छिड़काव करें।",
        "जैविक: नमी ज्यादा रहने पर अनुमोदित कॉपर ऑक्सीक्लोराइड का हल्का छिड़काव कर सकते हैं।",
        "रासायनिक: रोग बढ़ने पर मैन्कोज़ेब (Mancozeb 75% WP) का छिड़काव पैकेट पर लिखी सही मात्रा के अनुसार करें।",
      ],
      prevention_tips: [
        "Water at the base of plants in the morning instead of overhead sprinkling.",
        "Keep proper spacing between tomato plants for good airflow.",
        "Practice 2-year crop rotation with non-solanaceous crops like pulses or maize.",
      ],
      prevention_tips_hi: [
        "ऊपर से फव्वारे के बजाय पौधों की जड़ के पास सुबह पानी दें।",
        "पौधों के बीच हवा के लिए उचित दूरी रखें।",
        "टमाटर-आलू के बाद अगली फसल मक्का या दलहन की लें (फसल चक्र अपनाएं)।",
      ],
      summary_english:
        "Your tomato leaf shows classic Early Blight fungal spots with concentric rings and yellow borders. Remove the affected lower leaves today and begin with a neem oil spray; apply Mancozeb only if spots spread further, strictly following label instructions.",
      summary_hindi:
        "आपके टमाटर की पत्ती में अगेती झुलसा (Early Blight) के साफ लक्षण हैं, जिनमें गोल चकरी वाले भूरे धब्बे और पीला घेरा दिख रहा है। खराब पत्तियों को तुरंत हटाएं और नीम तेल से शुरुआत करें; रोग बढ़ने पर ही लेबल की मात्रा के अनुसार मैन्कोज़ेब का प्रयोग करें।",
    },
  },
  {
    id: "demo-potato-late-blight",
    imageUrl: "/src/assets/images/demo_potato_late_blight_1794891831203.jpg",
    labelEn: "Potato · Late Blight",
    labelHi: "आलू · पछेती झुलसा",
    subtitleEn: "91.8% confidence · High severity",
    subtitleHi: "91.8% सटीकता · अधिक गंभीरता",
    result: {
      crop_name: "Potato",
      crop_name_hi: "आलू",
      status: "Diseased",
      disease_name: "Late Blight (Phytophthora infestans)",
      disease_name_hi: "पछेती झुलसा रोग (Late Blight)",
      confidence: 91.8,
      severity: "High",
      affected_area_description:
        "Leaf margins and tip showing rapidly spreading dark, water-soaked necrotic patches.",
      affected_area_description_hi:
        "पत्ती के किनारों और सिरे पर काले-भूरे पानी जैसे भीगे धब्बे तेजी से फैल रहे हैं।",
      symptoms_observed: [
        "Large irregular dark brown to black water-soaked patches starting from leaf edges.",
        "Curling and drying of affected leaf tips.",
        "Often shows faint white mold on the leaf underside in cool, foggy weather.",
      ],
      symptoms_observed_hi: [
        "पत्ती के किनारों से शुरू होते बड़े, अनियमित काले-भूरे पानी जैसे भीगे धब्बे।",
        "प्रभावित पत्ती के सिरे मुड़कर सूखने लगे हैं।",
        "ठंड और कोहरे में पत्ती के निचले हिस्से पर हल्की सफेद फफूंद दिख सकती है।",
      ],
      treatment: [
        "Remove and burn or bury severely blighted plants immediately to stop field-wide spread.",
        "Organic: Spray preventive Bordeaux mixture (1%) or copper hydroxide during cloudy weather.",
        "Chemical: Because Late Blight spreads very fast, consult your KVK officer and apply Metalaxyl + Mancozeb or Cymoxanil + Mancozeb strictly as per label dosage.",
      ],
      treatment_hi: [
        "अधिक संक्रमित पत्तियों और पौधों को तुरंत उखाड़कर जमीन में दबा दें ताकि बाकी खेत बचे।",
        "जैविक: बदली या कोहरे के मौसम में बोर्डो मिश्रण (1%) या कॉपर आधारित जैविक छिड़काव करें।",
        "रासायनिक: यह रोग बहुत तेज़ी से फैलता है, इसलिए कृषि अधिकारी (KVK) की सलाह से मेटालैक्सिल + मैन्कोज़ेब का पैकेट के निर्देशानुसार छिड़काव करें।",
      ],
      prevention_tips: [
        "Use certified, disease-free potato seed tubers.",
        "Earth up ridges properly so rainwater does not reach tubers.",
        "Avoid excess nitrogen fertilizer and stop irrigation during heavy fog.",
      ],
      prevention_tips_hi: [
        "हमेशा प्रमाणित और रोग-मुक्त आलू के बीज का उपयोग करें।",
        "मेड़ों पर मिट्टी अच्छी तरह चढ़ाएं ताकि फफूंद कंदों तक न पहुंचे।",
        "कोहरे और नमी में सिंचाई कम करें और अधिक यूरिया डालने से बचें।",
      ],
      summary_english:
        "This potato leaf shows High-severity Late Blight, which spreads rapidly in cool, humid weather. Promptly isolate affected plants, avoid over-irrigation, and apply recommended protective sprays following local KVK guidance and label dosage.",
      summary_hindi:
        "इस आलू की पत्ती में गंभीर पछेती झुलसा (Late Blight) रोग है, जो ठंडे और नमी वाले मौसम में बहुत तेजी से पूरी फसल को नुकसान पहुंचा सकता है। प्रभावित पत्तियों को तुरंत अलग करें और KVK सलाह व लेबल निर्देश के अनुसार सुरक्षात्मक छिड़काव करें।",
    },
  },
  {
    id: "demo-apple-healthy",
    imageUrl: "/src/assets/images/demo_apple_healthy_1794891831128.jpg",
    labelEn: "Apple · Healthy Leaf",
    labelHi: "सेब · स्वस्थ पत्ती",
    subtitleEn: "97.5% confidence · Low severity",
    subtitleHi: "97.5% सटीकता · कम गंभीरता",
    result: {
      crop_name: "Apple",
      crop_name_hi: "सेब",
      status: "Healthy",
      disease_name: "Healthy Leaf (No Disease)",
      disease_name_hi: "स्वस्थ पत्ती (कोई रोग नहीं)",
      confidence: 97.5,
      severity: "Low",
      affected_area_description:
        "Uniform green leaf blade, crisp serrated margins, and clear veins with no visible spots or pest damage.",
      affected_area_description_hi:
        "पूरी पत्ती एकसमान हरी, किनारे साफ और नसें स्पष्ट हैं; कोई दाग या कीट क्षति नहीं दिखती।",
      symptoms_observed: [
        "Even chlorophyll green color across the entire surface.",
        "No necrotic spots, powdery mildew, or rust pustules.",
        "Firm leaf structure without curling or wilting.",
      ],
      symptoms_observed_hi: [
        "पूरी पत्ती पर गहरा और एकसमान हरा रंग है।",
        "किसी तरह के काले धब्बे, सफेद चूर्ण या जंग (Rust) के निशान नहीं हैं।",
        "पत्ती मज़बूत है और मुड़ी या मुरझाई हुई नहीं है।",
      ],
      treatment: [
        "No fungicide or chemical spray is needed right now.",
        "Continue balanced nutrition with well-rotted compost or vermicompost.",
        "Monitor the orchard weekly during humid or rainy periods.",
      ],
      treatment_hi: [
        "अभी किसी भी फफूंदनाशी या रासायनिक दवा के छिड़काव की आवश्यकता नहीं है।",
        "संतुलित पोषण के लिए सड़ी गोबर की खाद या केंचुआ खाद का उपयोग जारी रखें।",
        "बारिश या नमी के समय हफ्ते में एक बार बाग की जांच करते रहें।",
      ],
      prevention_tips: [
        "Prune crowded branches for good sunlight penetration and air movement.",
        "Clear fallen leaves after season to keep orchards clean.",
        "Maintain regular, well-drained soil moisture.",
      ],
      prevention_tips_hi: [
        "धूप और हवा के लिए घनी टहनियों की समय पर कटाई-छंटाई करें।",
        "मौसम के बाद गिरी हुई पुरानी पत्तियों को बाग से साफ करें।",
        "सिंचाई नियमित रखें और जड़ों के पास पानी न भरने दें।",
      ],
      summary_english:
        "Great news! This apple leaf looks completely healthy with uniform green color and clean veins. No treatment spray is needed—simply maintain regular pruning, compost feeding, and weekly orchard checks.",
      summary_hindi:
        "अच्छी खबर! आपकी सेब की पत्ती पूरी तरह स्वस्थ है और इसमें किसी भी बीमारी के लक्षण नहीं हैं। अभी किसी दवा की ज़रूरत नहीं है—बस नियमित देखभाल, खाद और समय-समय पर निगरानी जारी रखें।",
    },
  },
  {
    id: "demo-corn-leaf-blight",
    imageUrl: "/src/assets/images/demo_corn_leaf_blight_1794983612241.jpg",
    labelEn: "Corn · Leaf Blight",
    labelHi: "मक्का · पत्ती झुलसा",
    subtitleEn: "92.6% confidence · Medium severity",
    subtitleHi: "92.6% सटीकता · मध्यम गंभीरता",
    result: {
      crop_name: "Corn (Maize)",
      crop_name_hi: "मक्का",
      status: "Diseased",
      disease_name: "Northern Corn Leaf Blight",
      disease_name_hi: "मक्का का उत्तरी पत्ती झुलसा",
      confidence: 92.6,
      severity: "Medium",
      affected_area_description:
        "Elongated cigar-shaped tan lesions running parallel to the veins along the middle leaf blade.",
      affected_area_description_hi:
        "पत्ती के बीच में नसों के समानांतर लंबे नाव के आकार के भूरे धब्बे दिख रहे हैं।",
      symptoms_observed: [
        "Long, grayish-green to tan cigar-shaped lesions on the leaf blade.",
        "Lesions stay mostly bounded between major leaf veins.",
        "Lower leaves are affected first before moving upward.",
      ],
      symptoms_observed_hi: [
        "पत्ती पर लंबे, सिगार या नाव के आकार के हल्के भूरे धब्बे।",
        "धब्बे मुख्य नसों के बीच लंबाई में फैलते हैं।",
        "पहले निचली पत्तियों पर लक्षण दिखते हैं।",
      ],
      treatment: [
        "Remove heavily blighted lower leaves when infection is still localized.",
        "Organic: Apply Trichoderma-enriched compost tea or Neem oil spray (4 ml/L) as early protection.",
        "Chemical: If lesions spread onto upper cob leaves, consult KVK and spray Mancozeb 75% WP or Propiconazole strictly per label dosage.",
      ],
      treatment_hi: [
        "शुरुआती अवस्था में अधिक प्रभावित निचली पत्तियों को हटा दें।",
        "जैविक: शुरुआती सुरक्षा के लिए ट्राइकोडर्मा या नीम तेल (4 मिली/लीटर) का छिड़काव करें।",
        "रासायनिक: यदि धब्बे ऊपरी भुट्टे वाली पत्तियों तक फैलें, तो KVK सलाह से मैन्कोज़ेब 75% WP का लेबल अनुसार छिड़काव करें।",
      ],
      prevention_tips: [
        "Choose tolerant hybrid maize varieties suited to your district.",
        "Plow under infected crop residues after harvest.",
        "Rotate maize with legumes or mustard in the next season.",
      ],
      prevention_tips_hi: [
        "अपने क्षेत्र के लिए रोग-प्रतिरोधी मक्का किस्मों का चयन करें।",
        "कटाई के बाद पुराने फसल अवशेष खेत में अच्छी तरह मिला दें।",
        "अगले मौसम में दलहन या सरसों के साथ फसल चक्र अपनाएं।",
      ],
      summary_english:
        "Your maize leaf shows elongated cigar-shaped lesions typical of Northern Corn Leaf Blight. Remove lower damaged leaves and protect upper foliage early so grain filling stays strong.",
      summary_hindi:
        "आपकी मक्का की पत्ती में उत्तरी पत्ती झुलसा के लंबे भूरे धब्बे दिख रहे हैं। भुट्टे बनने तक ऊपरी पत्तियों को स्वस्थ रखने के लिए निचले खराब पत्ते हटाएं और समय पर उपचार करें।",
    },
  },
  {
    id: "demo-grape-black-rot",
    imageUrl: "/src/assets/images/demo_grape_black_rot_1794983611929.jpg",
    labelEn: "Grape · Black Rot",
    labelHi: "अंगूर · ब्लैक रॉट",
    subtitleEn: "93.4% confidence · Medium severity",
    subtitleHi: "93.4% सटीकता · मध्यम गंभीरता",
    result: {
      crop_name: "Grape",
      crop_name_hi: "अंगूर",
      status: "Diseased",
      disease_name: "Grape Black Rot",
      disease_name_hi: "अंगूर का ब्लैक रॉट रोग",
      confidence: 93.4,
      severity: "Medium",
      affected_area_description:
        "Scattered circular tan-reddish spots with dark brown borders across the upper leaf surface.",
      affected_area_description_hi:
        "पत्ती की ऊपरी सतह पर गहरे भूरे किनारों वाले गोल लाल-भूरे धब्बे फैले हैं।",
      symptoms_observed: [
        "Circular reddish-brown leaf spots with crisp dark margins.",
        "Tiny black fruiting dots visible inside older tan spot centers.",
        "Can spread to young berries during warm rainy spells.",
      ],
      symptoms_observed_hi: [
        "पत्ती पर गहरे किनारे वाले गोल लाल-भूरे धब्बे।",
        "पुराने धब्बों के बीच छोटे काले बिंदु दिखाई दे सकते हैं।",
        "गर्म और बारिश के मौसम में यह गुच्छों तक फैल सकता है।",
      ],
      treatment: [
        "Prune and destroy infected leaves and mummified berries from the vine.",
        "Organic: Spray wettable sulfur or Bordeaux mixture (1%) after rain showers.",
        "Chemical: Apply Captan or Mancozeb as per horticultural label dosage if humid weather persists.",
      ],
      treatment_hi: [
        "संक्रमित पत्तियों और सूखे खराब दानों को बेल से तोड़कर नष्ट करें।",
        "जैविक: बारिश के बाद घुलनशील गंधक या बोर्डो मिश्रण (1%) का छिड़काव करें।",
        "रासायनिक: लगातार नमी रहने पर लेबल निर्देश के अनुसार कैप्टान या मैन्कोज़ेब का उपयोग करें।",
      ],
      prevention_tips: [
        "Train vine canopies cleanly so sunlight dries morning dew quickly.",
        "Avoid overhead irrigation near flowering and fruit set.",
        "Keep weeds cleared under the trellis.",
      ],
      prevention_tips_hi: [
        "बेलों की छंटाई रखें ताकि धूप और हवा से ओस जल्दी सूखे।",
        "फूल और फल लगते समय ऊपर से पानी देने से बचें।",
        "बेल के नीचे खरपतवार साफ रखें।",
      ],
      summary_english:
        "This grape leaf has Black Rot lesions with dark rims. Clearing affected leaves and keeping the vine canopy airy with timely protective sprays will protect developing grape bunches.",
      summary_hindi:
        "इस अंगूर की पत्ती में ब्लैक रॉट रोग के गहरे किनारे वाले धब्बे हैं। खराब पत्तियाँ हटाकर और बेल को हवादार रखकर आप अंगूर के गुच्छों को सुरक्षित रख सकते हैं।",
    },
  },
  {
    id: "demo-pepper-healthy",
    imageUrl: "/src/assets/images/demo_pepper_healthy_1794983612328.jpg",
    labelEn: "Chilli / Pepper · Healthy",
    labelHi: "मिर्च · स्वस्थ पत्ती",
    subtitleEn: "98.1% confidence · Low severity",
    subtitleHi: "98.1% सटीकता · कम गंभीरता",
    result: {
      crop_name: "Bell Pepper / Chilli",
      crop_name_hi: "मिर्च / शिमला मिर्च",
      status: "Healthy",
      disease_name: "Healthy Leaf (No Disease)",
      disease_name_hi: "स्वस्थ पत्ती (कोई रोग नहीं)",
      confidence: 98.1,
      severity: "Low",
      affected_area_description:
        "Glossy dark-green leaf surface with clear symmetric veins and smooth edges.",
      affected_area_description_hi:
        "चमकदार गहरी हरी पत्ती, साफ नसें और बिना किसी धब्बे या मुड़ाव के किनारे।",
      symptoms_observed: [
        "Healthy bright green sheen with morning dew.",
        "No curling, mosaic mottling, or bacterial leaf spots.",
        "Clean underside and stem attachment.",
      ],
      symptoms_observed_hi: [
        "पत्ती पर स्वस्थ हरा रंग और ताज़ी चमक है।",
        "पत्ती मुड़ने (Leaf curl), चित्तीदार या जीवाणु धब्बे के कोई निशान नहीं हैं।",
        "डंठल और निचली सतह पूरी तरह साफ हैं।",
      ],
      treatment: [
        "No chemical spray required—your crop leaf is healthy.",
        "Use yellow sticky traps in the field to monitor whiteflies and thrips early.",
        "Apply balanced vermicompost or humic nourishment during flowering.",
      ],
      treatment_hi: [
        "किसी भी दवा के छिड़काव की आवश्यकता नहीं है—फसल स्वस्थ है।",
        "सफेद मक्खी और थ्रिप्स की निगरानी के लिए खेत में पीले चिपचिपे ट्रैप लगाएं।",
        "फूल आने पर केंचुआ खाद या संतुलित पोषण दें।",
      ],
      prevention_tips: [
        "Avoid waterlogging around chilli roots.",
        "Inspect leaf undersides weekly for aphids or mites.",
        "Maintain clean field bunds free of host weeds.",
      ],
      prevention_tips_hi: [
        "मिर्च की जड़ों के पास पानी जमा न होने दें।",
        "हफ्ते में एक बार पत्ती के नीचे माहू या मकड़ी की जांच करें।",
        "खेत की मेड़ों को खरपतवार से साफ रखें।",
      ],
      summary_english:
        "Your chilli/pepper leaf looks completely healthy with glossy green tissue and zero disease signs. Keep monitoring weekly with yellow sticky traps and balanced organic compost.",
      summary_hindi:
        "आपकी मिर्च की पत्ती पूरी तरह स्वस्थ और चमकदार है। किसी दवा की ज़रूरत नहीं है—बस साप्ताहिक निगरानी और संतुलित जैविक खाद जारी रखें।",
    },
  },
];
