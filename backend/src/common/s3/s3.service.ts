import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  PutBucketPolicyCommand,
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
      // Настраиваем публичный доступ к bucket
      await this.setPublicBucketPolicy();
    } catch (error: any) {
      // Bucket уже существует, но все равно настраиваем policy
      await this.setPublicBucketPolicy().catch(() => {
        // Игнорируем ошибки при установке policy
      });
    }
  }

  private async setPublicBucketPolicy() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${this.bucket}/*`],
        },
      ],
    };

    try {
      await this.client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucket,
          Policy: JSON.stringify(policy),
        }),
      );
    } catch (error) {
      // Игнорируем ошибки при установке policy
      // MinIO может требовать дополнительных настроек
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
        ACL: 'public-read',
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

  extractKeyFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.substring(1).split('/');
      return pathParts.slice(1).join('/');
    } catch {
      const parts = url.split('/');
      const bucketIndex = parts.findIndex((part) => part === this.bucket);
      if (bucketIndex !== -1 && bucketIndex < parts.length - 1) {
        return parts.slice(bucketIndex + 1).join('/');
      }
      return url;
    }
  }
}
