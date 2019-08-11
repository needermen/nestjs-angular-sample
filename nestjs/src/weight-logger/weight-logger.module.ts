import { Module, MulterModule } from '@nestjs/common';
import { WeightLogService } from './weight/weight-log.service';
import { WeightLogController } from './weight/weight-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightLog } from './weight/weight-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeightLog]),
    MulterModule.register({
      dest: '../upload',
    }),
  ],
  providers: [WeightLogService],
  controllers: [WeightLogController],
})
export class WeightLoggerModule {

}
