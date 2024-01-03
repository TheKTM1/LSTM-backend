import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-files')
  async getFiles(
    @Res() res
  ) {
    try {
      const dirPath = path.resolve(__dirname, '../export_data');
      const files = fs.readdirSync(dirPath);

      const fileNames = files.map((file) => {
        const filePath = path.join(dirPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        return JSON.parse(fileContent).name;
      });

      console.log('Uzyskano dostęp do danych.');
      
      res.json(fileNames);

    } catch (err) {
      console.error(`Błąd podczas odczytu zawartości folderu z danymi: ${err}.`);
      return `Błąd: ${err}.`;
    }
  }

  @Post('send-file')
  async sendFile(
    @Body('name') name: string,
  ){
    try {
      const dirPath = path.resolve(__dirname, '../export_data');
      const files = fs.readdirSync(dirPath);

      const fileData = files.map((file) => {
        const filePath = path.join(dirPath, file);
        const fileContentJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        return fileContentJson;
      })

      const foundFile = fileData.find(file => file.name === name);

      console.log(`Pobrano dane z pliku ${foundFile.name}.json.`);

      return foundFile;

    } catch (err) {
      console.error(`Błąd podczas odczytu zawartości folderu z danymi: ${err}.`);
      return `Błąd: ${err}.`;
    }
  }
}
