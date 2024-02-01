import { Test } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { Res } from '@nestjs/common';

describe('AppController', () => {
    let controller: AppController;
    let service: AppService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        controller = module.get<AppController>(AppController);
        service = module.get<AppService>(AppService);
    });
    
    describe('getFiles', () => {
        
        it('Should return 10 files from the directory', async () => {
    
            // const testArray = Array.from({ length: 10 }, (_, index) => `plik${index + 1}.json`);

            // jest.spyOn(controller, 'getFiles').mockReturnValue(testArray);

            // const res = "a"

            // const result = await controller.getFiles(a);

    
    
            // expect(result.length).toEqual(10);
    
        });
    });
});