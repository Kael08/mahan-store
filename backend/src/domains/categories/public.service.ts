import { Injectable } from '@nestjs/common';
import { CategoriesService } from './main/categories.service';

@Injectable()
export class CategoriesPublicService {
  constructor(private readonly service: CategoriesService) {}
}
