import { Router } from 'express'
import {
  serveImageController,
  serveM3u8Controller,
  serveSegmentController,
  serveVideoStreamController
} from '~/controllers/medias.controller'
import { wrapRequestHandler } from '~/utils/handlers'
const staticRouter = Router()

staticRouter.get('/image/:name', wrapRequestHandler(serveImageController))
staticRouter.get('/video-stream/:name', wrapRequestHandler(serveVideoStreamController))
staticRouter.get('/video-hls/:id/master.m3u8', wrapRequestHandler(serveM3u8Controller))
staticRouter.get('/video-hls/:id/:v/:segment', wrapRequestHandler(serveSegmentController))

export default staticRouter
