import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucket: string;
  private endpoint: string;

  constructor(private configService: ConfigService) {
    const accessKey = this.configService.get<string>('S3_ACCESS_KEY');
    const secretKey = this.configService.get<string>('S3_SECRET_KEY');
    this.endpoint =
      this.configService.get<string>('S3_ENDPOINT') || 'http://localhost:9000';
    this.bucket = this.configService.get<string>('S3_BUCKET') || 'images';

    if (!accessKey || !secretKey) {
      throw new InternalServerErrorException('S3 credentials not configured');
    }

    this.client = new S3Client({
      region: 'us-east-1', // Игнорируется MinIO
      endpoint: this.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    try {
      await this.client.send(new CreateBucketCommand({ Bucket: this.bucket }));
    } catch (error) {
      // Bucket уже существует
    }
  }

  async uploadFile(file: Express.Multer.File, key?: string) {
    const filename = key || `${Date.now()}-${file.originalname}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return (
      this.configService.get<string>('S3_ENDPOINT') +
      `/${this.bucket}/${filename}`
    );
  }

  async deleteFile(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
