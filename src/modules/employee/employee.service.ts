import { Injectable } from '@nestjs/common';
import { EmployeeEntity } from './employee.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly _employeeRepository: EntityRepository<EmployeeEntity>,
  ) {}

  create(body: CreateEmployeeDto): EmployeeEntity {
    return this._employeeRepository.create(body);
  }

  async write(entities: EmployeeEntity[]): Promise<void> {
    return this._employeeRepository
      .createQueryBuilder('e')
      .insert(entities)
      .onConflict('id')
      .ignore()
      .execute();
  }
}
