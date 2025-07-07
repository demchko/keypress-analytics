import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Keypress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    code: string;

    @CreateDateColumn()
    createdAt: Date;
}