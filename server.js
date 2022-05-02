const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const swaggerInter = require("swagger-ui-express");
const swaggerJs = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "SystemIntegration Final Project",
      version: "1.0.0",
      description: "ITIS-6177 Final Project",
      contact: {
        name: "Chiranjeevi Gorantla",
        url: "https://github.com/chiranjeevi-gorantla",
        email: "chiranjeevigorantla@gmail.com",
      },
    },
    host: "http://143.198.132.170:3000",
    basePath: "/",
  },
  apis: ["./server.js"],
};

const specs = swaggerJs(options);


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerInter.serve, swaggerInter.setup(specs));

const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const API_KEY = process.env.API_KEY;
const endpoint = "https://si-chiru.cognitiveservices.azure.com/";

const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(API_KEY));

/**
 * @swagger
 * /entity-recog:
 *   post:
 *     tags:
 *       - Named Entity Recognition
 *     description: The NER feature can identify and categorize entities in unstructured text.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           example: {"inputText":["Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800",
 *   "La sede principal de Microsoft se encuentra en la ciudad de Redmond, a 21 kilómetros de Seattle.",
 *   "Hello world I am Chitti the robot",
 *   "Apple headquarters is in",
 *   "Charlotte is a queens city"]}
 *     responses:
 *       200:
 *         description: Successfully retrieved response
 */

app.post("/entity-recog", async (req, res) => {
    let entityInputs = req.body.inputText;
    const entityResults = await textAnalyticsClient.recognizeEntities(entityInputs);
    res.json(entityResults);
})

/**
 * @swagger
 * /language-detect:
 *   post:
 *     tags:
 *       - Language Detection
 *     description: This can detect the language a document is written in, and returns a language code for a wide range of languages.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           example: {"langText":["Ce document est rédigé en Français."]}
 *     responses:
 *       200:
 *         description: Successfully retrieved response
 */

app.post("/language-detect", async (req, res) => {
    let languageInput = req.body.langText;
    const languageResult = await textAnalyticsClient.detectLanguage(languageInput);
    res.json(languageResult);
})

/**
 * @swagger
 * /key-phrase:
 *   post:
 *     tags:
 *       - Key Phrase Extraction
 *     description: Use key phrase extraction to quickly identify the main concepts in text.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           example: {"phraseText":["My cat might need to see a veterinarian."]}
 *     responses:
 *       200:
 *         description: Successfully retrieved response
 */

app.post("/key-phrase", async (req, res) => {
    let phraseInput = req.body.phraseText;
    const phraseResult = await textAnalyticsClient.extractKeyPhrases(phraseInput);
    res.json(phraseResult);
})

/**
 * @swagger
 * /Per-Iden:
 *   post:
 *     tags:
 *       - Personally Identifiable Information (PII) detection
 *     description: The PII detection feature can identify, categorize, and redact sensitive information in unstructured text.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Input
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *              type: string
 *           example: {"perText":["The employee's phone number is (555) 555-5555."]}
 *     responses:
 *       200:
 *         description: Successfully retrieved response
 */

app.post("/Per-Iden", async (req, res) => {
    let perInput = req.body.perText;
    // const perResult = await textAnalyticsClient.recognizePiiEntities(perInput);

    const results = await textAnalyticsClient.recognizePiiEntities(perInput, "en");
    for (const result of results) {
        if (result.error === undefined) {
            console.log("Redacted Text: ", result.redactedText);
            console.log(" -- Recognized PII entities for input", result.id, "--");
            for (const entity of result.entities) {
                console.log(entity.text, ":", entity.category, "(Score:", entity.confidenceScore, ")");
            }
        } else {
            console.error("Encountered an error:", result.error);
        }
    }
    res.json(results);
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));