//一些控制方法
/*eslint-disable no-extend-native*/

Array.prototype.pushWithoutDuplicate = function(){
  for(const i = 0; i <arguments.length;i++){
    const arg = arguments[i]
    if(this.indexOf(arg) === -1){
      this.push(arg)
    }
  }
}