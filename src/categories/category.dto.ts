export class CreateCategoryDto {
    name: string;
    image_link: string;
  }
  
  export class UpdateCategoryDto {
    name?: string;
    image_link?: string;
  }