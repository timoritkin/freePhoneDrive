const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userController = require("../controllers/users.js");
const gameController = require("../controllers/game.js");
const accidentController = require("../controllers/accident.js");
const questionnaireController = require("../controllers/questionnaire.js");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));



router.get('/game', gameController.getGame);
router.post('/game', gameController.saveGame);
router.get('/gameResult', gameController.getGameResult);

router.get('/car-accident-data', accidentController.getAccidentsData);
router.get('/questionnaire-result', questionnaireController.getQuestionnaireResult);
router.get('/car-accident', accidentController.getCarAccident);
router.post('/car-accident', accidentController.submitCarAccident);
router.post('/questionnaire', questionnaireController.submitQuestionnaire);
router.get('/questionnaire', questionnaireController.getQuestionnaire);
router.get('/', userController.showHomePage);


module.exports = router;

