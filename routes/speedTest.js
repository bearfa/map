const express =  require('express');
const router = express.Router();
const speedTest = require('speedtest-net');
router.get('/',async(req,res) => {
    try {
        let data = await speedTest({acceptLicense: true});
        res.json(data);
      } catch (err) {
        console.log(err.message);
      }
})

module.exports = router;