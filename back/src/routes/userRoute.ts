import { Router } from "express";
import { createUser, getUser, getUsersById, loginController, updateUserProfileImage } from "../controllers/userController";
import multer from "multer";


const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/users", getUser );
router.get("/users/:id", getUsersById );
router.post("/users/resgister", createUser );
router.post("/users/login", loginController);
router.put("/users/:id/image", upload.single('image'), updateUserProfileImage);
export default router;