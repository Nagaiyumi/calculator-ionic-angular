import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  display = "0";
  curNum: string = "";
  totalNum: number = null;
  operator: any = null;
  prevOperator: any = null;
  operating = false;

  constructor(private menu: MenuController){}

  openMenu(){
    this.menu.enable(true, 'burger');
    this.menu.open('burger');
  }

  numInput(val: any){
    if(val=='.'){
      if(this.curNum.lastIndexOf(".")>=0){
        return;
      }else if(this.curNum==""){
        this.curNum = "0";
      }
    }
    if(val=='0'){
      if(this.curNum==""){
        return;
      }
    }
    if(this.operating == true){
      this.operating = false;
      this.prevOperator = this.operator;
    }
    this.curNum = this.curNum + val;
    this.display = this.curNum;
  }

  opInput(val: any){
    if(this.operating){
      return;
    }

    this.calculate();
    this.display = String(this.totalNum);
    this.curNum = "";
    this.prevOperator = this.operator;
    this.operator = val;
    this.operating = true;
  }

  clear(){
    this.totalNum = null;
    this.curNum = "";
    this.display = "0";
    this.operating = false;
    this.operator = null;
  }

  calculate(){
    switch(this.prevOperator){
      case null:
        if(this.curNum == ""){
          break;
        } else {
          this.totalNum = Number(this.curNum);
          break;
        }
      case '+':
        this.totalNum = this.totalNum + Number(this.curNum);
        break;
      case '-':
        this.totalNum = this.totalNum - Number(this.curNum);
        break;
      case '*':
        this.totalNum = this.totalNum * Number(this.curNum);
        break;
      case '/':
        this.totalNum = this.totalNum / Number(this.curNum);
        break;
    }
  }

  equals(){
    this.calculate();
    this.operating = false;
    this.curNum = "";
    this.display = String(this.totalNum);
  }

}
