import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user', schema: 'calendar_app' })
export class User {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
  public id!: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  public name!: string;

  @Column({ name: 'profile_image_url', type: 'varchar', length: 255, nullable: true })
  public profileImageUrl?: string;

  @Column({ name: 'refresh_token', type: 'varchar', length: 255 })
  public refreshToken!: string | null;
}
