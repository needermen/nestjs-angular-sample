import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeightLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('decimal')
  kg: number;
}
