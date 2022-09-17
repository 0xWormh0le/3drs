import {Entity, Column} from 'typeorm';


export class AuditColumns {
    @Column({ length: 50 })
    created_by: string;
    
    @Column({type: "timestamp", default:'Now()'})
    created_date: Date;
    
    @Column({type: "uuid", nullable:true})
    created_by_uuid: string;

    @Column({ length: 50, nullable:true })
    updated_by: string;

    @Column({type: "timestamp", nullable:true})
    updated_date: Date;

    @Column({type: "uuid", nullable:true})
    updated_by_uuid: string;

    @Column({ length: 50, nullable:true })
    deleted_by: string;

    @Column({type: "timestamp", nullable:true})
    deleted_date: Date;

    @Column({type: "uuid", nullable:true})
    deleted_by_uuid: string;

    @Column({type: "boolean", default:true})
    soft_delete: boolean;

    @Column({type: 'boolean', default: true})
    active: boolean;
}
