import  express  from "express";
import { IpIdentificationController } from "../controllers";
import { LoginController } from "../controllers/login";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyBan } from "../middlewares/verifyBan";



const router = express.Router();

router.post('/login', LoginController.prototype.login);

router.get('/getIpIdentification', verifyBan ,verifyToken, IpIdentificationController.prototype.getIdIdentification);
router.post('/addIpToBanlist', verifyToken, IpIdentificationController.prototype.addIpToBanlist);
router.post('/deleteIpFromBanlist', verifyToken, IpIdentificationController.prototype.deleteIpFromBanlist);



export default router;