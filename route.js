import express from "express";
import { addfunction, deletefunction, showbyid, showfunction, updatefunction } from "./controllers.js";

const routes = express.Router()

.get('/',showfunction)
.post('/input',addfunction)
.delete('/delete:id',deletefunction)
.put('/update:id',updatefunction)
.get('/byid:id',showbyid)

export default routes;