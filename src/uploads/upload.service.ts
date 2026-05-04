import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../shared/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async uploadImage(file: Express.Multer.File, coachId: string) {
    const url = await this.cloudinaryService.uploadImage(file, `golfclip/${coachId}`);
    return { url, coachId };
  }

  async uploadFromUrl(imageUrl: string, coachId: string) {
    const url = await this.cloudinaryService.uploadFromUrl(imageUrl, `golfclip/${coachId}`);
    return { url, coachId };
  }
}
