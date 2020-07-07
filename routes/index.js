var express = require('express');
var router = express.Router();
const IndexControllers = require('../Controllers/Index.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(
        'you reached the battle reports. Send appropriate request to get data'
    );
});

router.get('/list', IndexControllers.battleList);

router.get('/count', IndexControllers.battleCount);

router.get('/search', IndexControllers.battleSearch);

module.exports = router;
