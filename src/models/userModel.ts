import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    id: number;

    @Column({nullable: true})
    first_name: string;

    @Column({nullable: true})
    last_name: string;
}
