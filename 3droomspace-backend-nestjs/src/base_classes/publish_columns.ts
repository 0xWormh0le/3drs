import {Column} from 'typeorm';
import {AuditColumns} from './audit_columns';

export class PublishColumns extends AuditColumns {
    @Column({type: 'timestamp', default: 'Now()'})
    publish_up_date: Date;

    @Column({type: 'timestamp', nullable: true})
    publish_down_date: Date;

    @Column({type: 'boolean', default: true})
    published: boolean;

    includeOnly(...fields: string[]): any {
        const column = {} as any;
        fields.forEach((field: string) => {
            column[field] = this[field];
        })
        return column;
    }

    exclude(...fields: string[]): any {
        const column = {} as any;
        for (const field in this) {
            if (!fields.includes(field)) {
                column[field] = this[field];
            }
        }
        return column;
    }

    excludeAudits(): any {
        return this.exclude(
            'created_by_uuid',
            'updated_by',
            'updated_by_uuid',
            'updated_date',
            'deleted_by',
            'deleted_by_uuid',
            'deleted_date',
            'soft_delete'
        );
    }
}
