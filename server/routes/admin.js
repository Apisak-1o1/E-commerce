const express = require('express')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()
const { getOrderAdmin, changeOrderStatus } = require('../controller/admin')


router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, getOrderAdmin)


module.exports = router