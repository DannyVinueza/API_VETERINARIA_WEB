import {Router} from 'express'
const router = Router()

import {
    swaggerDocs
} from "../controllers/swagger_controller.js";

router.get("/docs.json" ,swaggerDocs);

export default router