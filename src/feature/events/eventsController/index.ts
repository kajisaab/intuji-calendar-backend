import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { Router } from 'express';
import GetEventsUsecase from '../usecase/GetEvents.usecase';
import { validate } from '@core/validation';
import { createEventSchema } from '../validationScheme/CreateEvent.request.dto';
import CreateEvent from '../usecase/CreateEvent.usecase';

const router = Router();

router.get('/get-event', asyncHandler(GetEventsUsecase));

router.post('/create-event', validate(createEventSchema), asyncHandler(CreateEvent));

export default router;
