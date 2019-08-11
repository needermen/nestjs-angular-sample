import {
  Body,
  Controller,
  FileInterceptor,
  FilesInterceptor,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AddOrUpdateWeightLog } from './dtos/add-or-update-weight.log';
import { WeightLogService } from './weight-log.service';

@Controller('weightLog')
export class WeightLogController {

  constructor(private readonly weightLogService: WeightLogService) {
  }

  @Get()
  all() {
    return this.weightLogService.all();
  }

  @Get(':date')
  Get(@Param('date') date: string) {
    const newDate = clearHours(new Date(date));
    return this.weightLogService.getByDate(newDate);
  }

  @Put()
  put(@Body() weight: AddOrUpdateWeightLog) {
    weight.date = clearHours(new Date(weight.date));
    return this.weightLogService.addOrUpdate(weight);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    this.processFile(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: any[]) {
    for (let file of files) {
      this.processFile(file);
    }
  }

  processFile(file) {
    const fs = require('fs');
    const service = this.weightLogService;
    fs.readFile(file.path, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      const weightlogs = (<any[]> JSON.parse(data)).map((value) =>
        <AddOrUpdateWeightLog> {
          date: clearHours(addHours(new Date(value.date), 4)),
          kg: calculatekg(value.weight),
        });

      service.bulkAddOrUpdate(weightlogs);

      fs.unlink(file.path, () => {
      });
    });
  }

  saveBulkWeightLogs(weightLogs: AddOrUpdateWeightLog[]) {
    this.weightLogService.bulkAddOrUpdate(weightLogs);
  }
}

function clearHours(date: Date) {
  date.setUTCMilliseconds(0);
  date.setUTCSeconds(0);
  date.setUTCMinutes(0);
  date.setUTCHours(0);
  return date;
}

function addHours(date: Date, hours: number) {
  date.setHours(date.getHours() + hours);
  return date;
}

function calculatekg(lbs: number) {
  return rountToOndeDecimal(lbs / 2.20462);
}

function rountToOndeDecimal(num: number) {
  return Math.round(num * 10) / 10;
}
