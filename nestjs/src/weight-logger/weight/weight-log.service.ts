import { Injectable } from '@nestjs/common';
import { WeightLog } from './weight-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOrUpdateWeightLog } from './dtos/add-or-update-weight.log';

@Injectable()
export class WeightLogService {
  constructor(
    @InjectRepository(WeightLog)
    private readonly weightLogRepository: Repository<WeightLog>,
  ) {
  }

  all() {
    return this.weightLogRepository.find();
  }

  getByDate(date: Date) {
    return this.weightLogRepository.findOne({ where: { date: date } });
  }

  addOrUpdate(weightLog: AddOrUpdateWeightLog) {
    this.weightLogRepository.findOne({ where: { date: weightLog.date } }).then((value) => {
      if (value) {
        value.kg = weightLog.kg;
        this.weightLogRepository.save(value).then();
      } else {
        this.weightLogRepository.save(weightLog).then();
      }
    });
  }

  bulkAddOrUpdate(weightlogs: AddOrUpdateWeightLog[]) {
    for (let weightlog of weightlogs) {
      this.addOrUpdate(weightlog);
    }
  }
}
