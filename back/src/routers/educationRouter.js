import { Router } from 'express';

import { educationService } from '../services/educationService';

const router = Router();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log('라우터 ' + data);
  const registeredEducation = await educationService.addEducationInfo(data);
  
  res.status(200).send(registeredEducation);
});

module.exports = router;
