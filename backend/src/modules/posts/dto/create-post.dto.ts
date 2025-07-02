export class CreatePostDto {
  title: string;
  content: string;
  imageUrls?: string[] | undefined;
}
