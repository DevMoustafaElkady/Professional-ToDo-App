/* Todo Class */
export class Todo {
    title: string | null = null;
    priority: number | null = null;
    group:number | null = null;
    description:string | null = null;
    date:Date | null = null;
    isCompleted:boolean | null = null;
    isDeleted:boolean | null = null;
}

/* Todo Filter */
export class TodoFilter {
    search: string  = '';
    group:number | null = null;
    groupId:string | null = null;
    date:Date | null = null;
    isDeleted : boolean | null = null;
    isCompleted : boolean | null = null;
    dateRange : DateRange = new DateRange()

}
/* Date Range */
export class DateRange {
firstDate:Date | null = null;
lastDate:Date | null = null;
}

/* Todo Grouped */
export class TodoGrouped {
      group1 : Todo[] = [];
      group2 : Todo[] = [];
      ourHome : Todo[] = [];
      constructor(data?:Todo[]) {
        if(data && data.length) {
          this.group1 = this.filterData(data,groupEnum.group1);
          this.group2 = this.filterData(data,groupEnum.group2);
          this.ourHome = this.filterData(data,groupEnum.ourHome);
        }
      }
        filterData(data:Todo[], id: number):Todo[] {
          return data.filter((el:Todo) => el.group == id)
        }
}


export const groupEnum : any = {
  group1 : 1,
  group2 : 2,
  ourHome : 3
}

export const getKeyByvalue =  (obj:any,val:any):any => {
     return Object.keys(obj).find(key => obj[key] === val) || ''
}

/* Group Enums */
export const groupEnumName : any = {
    group1 : 'Group 1',
    group2 : 'Group 2',
    ourHome : 'Our Home ToDos'
}



/* Get Date */
export const nextweek = () => {
  var today = new Date();
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  return nextweek;
}
