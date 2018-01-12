export class Directory{
    name: string;
    directories: any[];
    files: any[];
    expanded:boolean;
    checked:boolean;
    showIcon = false;
    icon = null;
    
    constructor(name,directories,files) {
        this.name = name;
        this.files = files;
        this.directories = directories;
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
        this.directories.forEach(d => {
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