import * as express from 'express';
import multer from 'multer';
import { parsefile } from '../controller/logger'

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/parsefile', upload.single('logFile'), async (req, res) => {
    if (!req.file?.path) {
        return res.status(422).json({
            success: false,
            message: 'missing File!'
        });
    }

    return parsefile(res, req.file.path)
});

router.get('/', async (req, res) => {
    res.status(422).json({ success: true });
});

export default router;
