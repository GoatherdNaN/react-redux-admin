import moment from 'moment';
 export const deepCopy = source => {
	let _type = typeof source;
  if ('object' === _type.toLowerCase()) {
      let result = {};
      for (let key in source) {
          result[key] = typeof source[key] === 'object'
              ? deepCopy(source[key])
              : source[key];
      }
      if (source instanceof Array) {
          result.length = source.length;
          result = Array.from(result);
      }
      return result;
  }
  return source;
}

export const getDateToday = () => {
    return moment(new Date()).format('YYYY/MM/DD');
}
export const getDateBefore1Months = (date) => {
    if (moment(date).isValid()) return moment(date).subtract(1, 'months').format('YYYY/MM/DD');
}
export const insertKey = (arr) => {
  return arr.map((item,index)=>{
    item.key=index;
    return item;
  })
}
//通过某天获取其所在月
export const getCurrentMonth = date => {
	if(!/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/.test(date)){
    	    alert('请传入一个yyyy-MM-dd格式的时间');
    	    return;
        }
        let month=new Date(date.replace(/-/, "/")).getMonth()+1;
        let year=new Date(date.replace(/-/, "/")).getFullYear();
        let new_year = year;
        let new_month = month++;
        if(month>12) {
            new_month -= 12;
            new_year++;
        }
        let monthFirstDay = new Date(new_year,new_month,1);
        let monthLastDay=(new Date(monthFirstDay.getTime()-1000*60*60*24)).getDate();
        let monthObj={};
        monthObj.monthFirstDay=year+'-'+(month-1)+'-'+1;
        monthObj.monthLastDay=year+'-'+(month-1)+'-'+monthLastDay;
        return monthObj;
};
//通过某天获取其所在周
export const getCurrentWeek=date=>{
	if(!/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/.test(date)){
	    alert('请传入一个yyyy-MM-dd格式的时间');
            return;
        }
	let w = new Date(date.replace(/-/, "/")).getDay();
	let n = (w == 0 ? 7 : w) - 1;
	let weekObj = {};
	weekObj.weekFirstDay = new Date(new Date(date.replace(/-/, "/")).getTime() + 24*(-n)*60*60*1000).toLocaleDateString().replace(/\//g,'-');
	weekObj.weekLastDay = new Date(new Date(weekObj.weekFirstDay.replace(/-/, "/")).getTime() + 24*6*60*60*1000).toLocaleDateString().replace(/\//g,'-');
	return weekObj;
}
export const getDateBeforeWeek = (date) => {
    if (moment(date).isValid()) return moment(date).subtract(6, 'days').format('YYYY-MM-DD');
};
