import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // Навмисні помилки для тестування лінтера та форматтера
    /*
    var unusedVariable = 'test'; // no-var error
    let anotherVar = "double quotes"; // singleQuote error from formatter
    const obj = {name:'John',age:30}; // object-shorthand, spacing errors
    const str = 'Hello ' + 'World'; // prefer-template error
    console.log('Debug message'); // no-console error
    if (str == 'test') { // eqeqeq error
      return this.appService.getHello();
    }
    */

    return this.appService.getHello();
  }
}
