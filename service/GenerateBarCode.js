const ObjectOfNakladna = require('../models/ObjectOfNakladnaModel');

class BarCode{

  static async generateBarCode(element){
    const elementsBody = await ObjectOfNakladna.findById(element.elementBody).exec();
    let barCode = "";
    for(let i=0; i < 2; i++){
      barCode += elementsBody.name[i];
    }for(let i=0; i < 2; i++){
      barCode += elementsBody.size.height[i];
    }
    for(let i=0; i < 2; i++){
      barCode += elementsBody.size.length[i];
    }
    let koef = 0;
    for(let i = 0; i < elementsBody.size.width.length; i++){
      const point = ['.'];
      if(elementsBody.size.width[i] !== point[0]){
        if(koef!==2){
          barCode += elementsBody.size.width[elementsBody.size.width.length - 1];
          koef++;
        }
      }
    }
    let barCodeNeeds = 13 - barCode.length;
    for(let i = 1; i < barCodeNeeds; i++){
      let now = new Date();
      let ticks = now.getTime().toString();
      barCode += ticks[ticks.length-i];
    }
    barCode = barCode.toUpperCase();
    for(let i = 0; i < 13; i++){
      let angl =["ERTYUIOPASDFHJKLZXCVBNM"];
      let ukr = ["ЕРТУИІОПАСДФШЙКЛЗХСВБНМ"];
      for(let j = 0; j < angl.length - 1; j++){
        if(barCode[i]===ukr[j]) {
          barCode[i]=angl[j];
        }
      }
    }
    return Promise.resolve(barCode);
  }
}

module.exports = BarCode;