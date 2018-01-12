export class ClassificationFi{
    id: number;
    name: any;
    classification: any[];
    
    expanded:boolean;
    checked:boolean;
    showIcon = false;
    icon = null;
    
    constructor(name,id, classification) {
        this.name = name;
        this.id = id;
        this.classification = classification;
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
        this.classification.forEach(d => {
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
