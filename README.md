# SystemIntegration-Final-Project

Final project assignment for ITIS 6177 to create an API using Language Service - Entity Recognition

(https://azure.microsoft.com/en-us/services/cognitive-services/language-service/)

(https://docs.microsoft.com/en-us/azure/cognitive-services/language-service/named-entity-recognition/overview)

Azure TextAnalytics is a cloud-based service that provides advanced natural language processing over raw text, and includes six main functions:

Language Detection
Sentiment Analysis
Key Phrase Extraction
Named Entity Recognition
Recognition of Personally Identifiable Information
Linked Entity Recognition
Healthcare Analysis
Support Multiple Actions Per Document

## 1. Named Entity Recognition
The NER feature can identify and categorize entities in unstructured text. For example: people, places, organizations, and quantities.

**Sample Input**
```
 ["Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800",
        "La sede principal de Microsoft se encuentra en la ciudad de Redmond, a 21 kilómetros de Seattle."]
```

## 2. Language Detection
Language detection can detect the language a document is written in, and returns a language code for a wide range of languages, variants, dialects, and some regional/cultural languages.

**Sample Input**
```
["Ce document est rédigé en Français."]
```


## 3. Key Phrase Extraction
Use key phrase extraction to quickly identify the main concepts in text.

**Sample Input**
```
["My cat might need to see a veterinarian."]
```

## 4. Personally Identifiable Information (PII) detection
he PII detection feature can identify, categorize, and redact sensitive information in unstructured text. For example: phone numbers, email addresses, and forms of identification.

**Sample Input**
```
["The employee's phone number is (555) 555-5555."]
```

### 5. Text Analytics for Health
Text Analytics for health extracts and labels relevant medical information from unstructured texts such as doctor's notes, discharge summaries, clinical documents, and electronic health records.

**Sample Input**
```
["Prescribed 100mg ibuprofen, taken twice daily."]
```

