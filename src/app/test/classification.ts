export class Classification{
    name: any;
    Classification: any[];
    metadata: any[];
    expanded:boolean;
    checked:boolean;
    showIcon = false;
    icon = null;
    product:any;
    
    constructor(name,metadata, Classification) {
        this.name = name;
        this.metadata = metadata;
        this.Classification = Classification;
        this.expanded = false;
        this.checked = false;
        this.showIcon = true;
        this.icon = this.getIcon();
    }
    toggle(){
        this.expanded = !this.expanded;
        this.icon = this.getIcon();
    }
    check(){
        let newState = !this.checked;
        this.checked = newState;
        this.checkRecursive(newState);
    }
    checkRecursive(state){
        this.Classification.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        })
    }
    expand(){
        this.expanded = !this.expanded;
        
      }
    getIcon(){
        if (this.showIcon === true) {
          if(this.expanded){
            return '- ';
          }
          return '+ ';
        }
        return null;
    }
}
