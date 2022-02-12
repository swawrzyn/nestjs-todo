import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  @Exclude()
  passwordDigest: string;

  @Column({ default: true })
  isActive: boolean;

  public set password(value: string) {
    this.passwordDigest = bcrypt.hashSync(value, 10);
  }

  public verifyPassword(value: string) {
    return bcrypt.compareSync(value, this.passwordDigest);
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
