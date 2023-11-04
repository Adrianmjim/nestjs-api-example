import { Migration } from '@mikro-orm/migrations';

export class Migration20220812105332 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "User" ("id" uuid not null, "created_at" timestamptz(0) not null, "created_by_id" uuid not null, "updated_at" timestamptz(0) null, "updated_by_id" uuid null, "version" int not null default 1, "avatar_type" text check ("avatar_type" in (\'male\', \'female\', \'any\', \'photo\')) not null, "avatar_url" varchar(128) null, "coach_id" uuid null, "email" varchar(64) not null, "name" varchar(64) not null, "permissions" text[] not null, "surname" varchar(64) not null, constraint "User_pkey" primary key ("id"));',
    );
    this.addSql('alter table "User" add constraint "User_email_unique" unique ("email");');

    this.addSql(
      'create table "Course" ("id" uuid not null, "created_at" timestamptz(0) not null, "created_by_id" uuid not null, "updated_at" timestamptz(0) null, "updated_by_id" uuid null, "version" int not null default 1, "flags" jsonb not null, "image_path" varchar(256) not null, "name" varchar(128) not null, "origin_language" varchar(16) not null, "target_language" varchar(16) not null, "valid_at" timestamptz(0) not null, constraint "Course_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "UserCourse" ("id" uuid not null, "created_at" timestamptz(0) not null, "created_by_id" uuid not null, "updated_at" timestamptz(0) null, "updated_by_id" uuid null, "version" int not null default 1, "course_id" uuid not null, "user_id" uuid not null, constraint "UserCourse_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "User" add constraint "User_created_by_id_foreign" foreign key ("created_by_id") references "User" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "User" add constraint "User_updated_by_id_foreign" foreign key ("updated_by_id") references "User" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "User" add constraint "User_coach_id_foreign" foreign key ("coach_id") references "User" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "Course" add constraint "Course_created_by_id_foreign" foreign key ("created_by_id") references "User" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "Course" add constraint "Course_updated_by_id_foreign" foreign key ("updated_by_id") references "User" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "UserCourse" add constraint "UserCourse_created_by_id_foreign" foreign key ("created_by_id") references "User" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "UserCourse" add constraint "UserCourse_updated_by_id_foreign" foreign key ("updated_by_id") references "User" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "UserCourse" add constraint "UserCourse_course_id_foreign" foreign key ("course_id") references "Course" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "UserCourse" add constraint "UserCourse_user_id_foreign" foreign key ("user_id") references "User" ("id") on update cascade;',
    );
  }
}
