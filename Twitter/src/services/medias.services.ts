import { Request } from 'express'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import fsPromise from 'fs/promises'
import { envConfig, isProduction } from '~/constants/config'
import { EncodingStatus, MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { encodeHLSWithMultipleVideoStreams } from '~/utils/video'
import databaseService from './database.services'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import { uploadFileToS3 } from '~/utils/s3'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'

class Queue {
  items: string[]
  encoding: boolean
  constructor() {
    this.items = []
    this.encoding = false
  }
  async enqueue(items: string) {
    this.items.push(items)
    const idName = getNameFromFullname(items.split('/').pop() as string)
    await databaseService.videoStatus.insertOne(
      new VideoStatus({
        name: idName,
        status: EncodingStatus.Pending
      })
    )
    this.processEncode()
  }
  async processEncode() {
    if (this.encoding) return
    if (this.items.length > 0) {
      this.encoding = true
      const videoPath = this.items[0]
      const idName = getNameFromFullname(videoPath.split('/').pop() as string)
      await databaseService.videoStatus.updateOne(
        {
          name: idName
        },
        {
          $set: {
            status: EncodingStatus.Processing
          },
          $currentDate: {
            updated_at: true
          }
        }
      )
      try {
        await encodeHLSWithMultipleVideoStreams(videoPath)
        this.items.shift()
        await fsPromise.unlink(videoPath)
        await databaseService.videoStatus.updateOne(
          {
            name: idName
          },
          {
            $set: {
              status: EncodingStatus.Success
            },
            $currentDate: {
              updated_at: true
            }
          }
        )
        console.log(`Encode video ${videoPath} success`)
      } catch (error) {
        await databaseService.videoStatus
          .updateOne(
            {
              name: idName
            },
            {
              $set: {
                status: EncodingStatus.Failed
              },
              $currentDate: {
                updated_at: true
              }
            }
          )
          .catch((err) => {
            console.error('Update video status error', err)
          })
        console.error(`Encode video ${videoPath} success`)
        console.error(error)
      }
      this.encoding = false
      this.processEncode()
    } else {
      console.log('Encode video queue is empty')
    }
  }
}
const queue = new Queue()
class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newFullFilename = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, newFullFilename)
        await sharp(file.filepath).jpeg().toFile(newPath)
        const mime = (await import('mime')).default
        // const s3Result = await uploadFileToS3({
        //   filename: 'images/' + newFullFilename,
        //   filepath: newPath,
        //   contentType: mime.getType(newPath) as string
        // })
        // await Promise.all([fsPromise.unlink(file.filepath), fsPromise.unlink(newPath)])
        // return {
        //   url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
        //   type: MediaType.Image
        // }
        return {
          url: isProduction
            ? `${envConfig.host}/static/image/${newFullFilename}`
            : `http://localhost:${envConfig.host}/static/image/${newFullFilename}`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const mime = (await import('mime')).default
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const s3Result = await uploadFileToS3({
          filename: 'videos/' + file.newFilename,
          filepath: file.filepath,
          contentType: mime.getType(file.filepath) as string
        })
        fsPromise.unlink(file.filepath)
        return {
          url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
          type: MediaType.Image
        }
        // return {
        //   url: isProduction
        //     ? `${process.env.HOST}/static/video/${file.newFilename}`
        //     : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
        //   type: MediaType.Video
        // }
      })
    )
    return result
  }
  async uploadVideoHLS(req: Request) {
    const files = await handleUploadVideo(req)

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        console.log('newName')
        queue.enqueue(file.filepath)
        return {
          url: isProduction
            ? `${envConfig.host}/static/video-hls/${newName}.m3u8`
            : `http://localhost:${envConfig.port}/static/video-hls/${newName}.m3u8`,
          type: MediaType.HLS
        }
      })
    )
    return result
  }
  async getVideoStatus(id: string) {
    const data = await databaseService.videoStatus.findOne({
      name: id
    })
    return data
  }
}

const mediasService = new MediasService()
export default mediasService
