const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFiles } = require("../controllers/uploads");
const { dataValidator } = require('../middlewares/dataValidator');

const router = Router();

router.post('/', uploadFiles);


module.exports = router;
