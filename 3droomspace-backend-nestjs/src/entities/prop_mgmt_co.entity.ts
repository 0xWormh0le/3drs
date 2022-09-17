import {Entity, Column, PrimaryColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AuditColumns} from "../base_classes/audit_columns";
import {User} from "./user.entity";

@Entity("prop_mgmt_companies")
export class PropMgmtCo extends AuditColumns {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100})
    name: string;

    @Column({type: "json", nullable:true})
    address: string; // JSON Object

    @Column({ length: 50 , nullable:true})
    phone: string;

    @Column({type: "json", nullable:true})
    phone_alt: string; // JSON Object

    @Column({ length: 100 , nullable:true})
    email: string;

    @Column({type: "json", nullable:true})
    email_alt: string; // JSON Object

    @Column({ length: 255, nullable:true})
    url: string;

}
