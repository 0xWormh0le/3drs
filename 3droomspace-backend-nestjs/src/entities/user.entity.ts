import {Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {PropMgmtCo} from "./prop_mgmt_co.entity";
import {AuditColumns} from "../base_classes/audit_columns";
import {AddressClass} from '../classes/address.class';
import {LifestyleClass} from '../classes/lifestyle.class';

@Entity("users")
export class User extends AuditColumns {

    @PrimaryGeneratedColumn("uuid")
    id: string;
// Start - LANDLORD only
    @ManyToOne(() => PropMgmtCo, prop_mgmt_co => prop_mgmt_co.id)
    prop_mgmt_co: PropMgmtCo;

    @RelationId((user: User) => user.prop_mgmt_co)
    @Column({type: "uuid", nullable:true, name: "propMgmtCoId"})
    propMgmtCoId: string;

    @Column({length:50, nullable:true})
    prop_company_name: string;
// End - LANDLORD only
// Start common
    @Column({ length: 20 , default: 'RENTER'})
    user_type: string;

    @Column({ length: 50})
    first_name: string;

    @Column({ length: 50, nullable: true})
    middle_name: string;

    @Column({ length: 50})
    last_name: string;

    @Column({ length: 100})
    email: string;

    @Column({type: "json", nullable: true})
    email_alt: string; // JSON Object

    @Column({ length: 50})
    phone: string;

    @Column({type: "json", nullable: true})
    phone_alt: string; // JSON Object

    @Column({ length:255, nullable:true })
    avatar_url: string;

    @Column({type: "json", nullable:true})
    address: AddressClass; // JSON Object
// End Common
// Start RENTER Only
    @Column({ type: "date", nullable: true })
    dob: Date;

    @Column( { length: 50, nullable:true})
    relationship_status: string;

    @Column({ length: 15, nullable:true})
    gender: string;

    @Column({ length: 100, nullable:true })
    ssn: string; // Encrypted SSN

    @Column({type: "json", nullable:true})
    lifestyle: LifestyleClass; // JSON Object

    @Column({type: "boolean", default: false})
    use_email_verify: boolean;

    @Column({type: "boolean", default: false})
    use_phone_verify: boolean;

    @Column({ length: 10, nullable: true })
    phone_verify_code: string;

    @Column({ length: 10, nullable: true })
    email_verify_code: string;

    @Column({type: "boolean", default: true})
    verified: boolean;

    @Column({type: "boolean", default: false})
    bg_check_done: boolean;

    @Column({type: "integer", nullable:true})
    credit_score: number;

    @Column({type: "date", nullable:true})
    credit_score_date: Date;

    @Column({type: "integer", nullable:true})
    rental_score: number;

    @Column({type: "date", nullable:true})
    rental_score_date: Date;
// End RENTER Only
// Never transmitted
    @Column({length:255, nullable:true})
    salt: string;

    @Column({length: 255, nullable:true})
    hash: string;

}
