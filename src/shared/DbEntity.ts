import { Column } from 'typeorm/browser';

export class DbEntity {
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;
}
