import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  avatar: string;

  @Expose({ name: "avatar_url" })
  avatar_url(): string | null {
    switch (process.env.STORAGE_PROVIDER) {
      case "local":
        return `${process.env.APP_API_URL as string}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL as string}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }
  }
}

export { User };
