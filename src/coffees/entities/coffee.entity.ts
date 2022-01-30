import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  // Stores a json array in one cell. ex ["Vanilla"]
  // @Column('json', { nullable: true })
  @JoinTable() // Owner side
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffee, { cascade: true })
  flavors: Flavor[];
}
