import express from 'express'


import { getDataSet, addPoint } from './dateSet.controller.js'
const router = express.Router()


router.get('/', getDataSet)
router.post('/',addPoint)


export const dataSetRoutes = router