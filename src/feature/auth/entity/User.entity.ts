import { DbEntity } from 'shared/DbEntity';
import { Column, Table } from 'typeorm';
import { Entity } from 'typeorm';

@Entity({ name: 'user', schema: 'blog' })
export class User extends DbEntity {
  @Column({ name: 'id', type: 'text', primary: true })
  public id!: string;

  @Column({ name: 'user_name', type: 'text', nullable: false, unique: true })
  public userName!: string;

  @Column({ name: 'email', type: 'text', nullable: false, unique: true })
  public email!: string;

  @Column({ name: 'first_name', type: 'text', nullable: false })
  public firstName!: string;

  @Column({ name: 'last_name', type: 'text', nullable: false })
  public lastName!: string;

  @Column({ name: 'bio', type: 'text' })
  public bio!: string;

  @Column({ name: 'profile_image_url', type: 'text' })
  public profileImageUrl!: string;

  @Column({ name: 'role', type: 'text' })
  public role!: string;
}
