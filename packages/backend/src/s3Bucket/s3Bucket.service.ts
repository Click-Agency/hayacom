import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class S3BucketService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });

  public constructor() {}

  public async uploadVideo(videoData: Express.Multer.File): Promise<string> {
    try {
      const Key = `videos/${Date.now()}-${videoData.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key,
        Body: videoData.buffer,
        ContentType: videoData.mimetype,
      });

      await this.s3Client.send(command);

      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${Key}`;
    } catch (error) {
      throw new HttpException('Failed to upload video.', 500);
    }
  }

  public async deleteVideo(video: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `videos/${video.split('/').slice(-1)[0]}`,
      });

      await this.s3Client.send(command);
    } catch (error) {
      throw new HttpException('Failed to delete video.', 500);
    }
  }

  public async uploadImages(
    imagesData: Express.Multer.File[],
  ): Promise<string[]> {
    const uploadedKeys: string[] = [];

    try {
      for (const imageData of imagesData) {
        const Key = `images/${Date.now()}-${imageData.originalname}`;

        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key,
          Body: imageData.buffer,
          ContentType: imageData.mimetype,
        });

        await this.s3Client.send(command);
        uploadedKeys.push(Key);
      }

      return uploadedKeys.map(
        (Key) =>
          `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${Key}`,
      );
    } catch (error) {
      // Rollback: delete all uploaded files
      for (const Key of uploadedKeys) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key,
        });
        await this.s3Client.send(deleteCommand);
      }

      throw new HttpException(
        'Failed to upload all images. Transaction rolled back.',
        500,
      );
    }
  }

  public async deleteImages(images: string[]) {
    try {
      for (const image of images) {
        const command = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `images/${image.split('/').slice(-1)[0]}`,
        });

        await this.s3Client.send(command);
      }
    } catch (error) {
      throw new HttpException('Failed to delete all images.', 500);
    }
  }
}
