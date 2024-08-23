import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import { Router } from 'express';
import GetEventsUsecase from '../usecase/GetEvents.usecase';

const router = Router();

router.get('/get-event', asyncHandler(GetEventsUsecase));

export default router;
