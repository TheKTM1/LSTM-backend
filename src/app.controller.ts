import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-files')
  async getFiles() {
    try {
      const dirPath = path.resolve(__dirname, '../export_data');
      const files = fs.readdirSync(dirPath);

      console.log('Uzyskano dostęp do danych.');

      const fileNames = files.map((file) => {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        return JSON.parse(fileContent).name;
      });
      
      return fileNames;

    } catch (err) {
      console.error(`Błąd podczas odczytu zawartości folderu z danymi: ${err}.`);
      return `Błąd: ${err}.`;
    }
  }
}
