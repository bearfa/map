const express =  require('express');
const router = express.Router();
const speedTest = require('speedtest-net');
router.get('/',async(req,res) => {
    try {
        let data = await speedTest({acceptLicense: true});
        res.json(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        process.exit(0);
      }
})

module.exports = router;