import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  create(data: any) {
    return this.repo.create(data);
  }

  findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }

  findById(id: number) {
    return this.repo.findById(id);
  }
}
