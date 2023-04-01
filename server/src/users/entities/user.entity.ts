import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('text', {
        unique: true
    })
    email: string;
    @Column({ type: 'text', nullable: true  })
    password: string;
    @Column('text')
    fullName: string;
    @Column('bool')
    isActive: boolean;


}
export default User;