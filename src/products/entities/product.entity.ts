import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image-entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '1a2b3c4d5e6f7g8h9i0j',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Shoes leng',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price',
    default: 0,
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example: 'lorem ipsum dolor sit amet',
    description: 'Product description',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'shoes_leng',
    description: 'Product SLUG - for SEO',
    uniqueItems: true,
  })
  @Column({ type: 'text', unique: true })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['M', 'XL'],
    description: 'Product sizes',
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('’', '')
      .replaceAll('`', '')
      .toLowerCase();
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('’', '')
      .replaceAll('`', '')
      .toLowerCase();
  }
}
