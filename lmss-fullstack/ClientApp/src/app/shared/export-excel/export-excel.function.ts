import * as FileSaver from "file-saver";
import * as dayjs from "dayjs";

export function exportExcel(data: any, name: string) {
    import("xlsx").then(xlsx => {
      const filteredData = data.filter((item: any) => item.user && item.book);
      console.log(filteredData, 'FILTERED DATA!');
      let flattenedData;

      // Then, flatten the remaining data
      if(filteredData.length > 0) {
        flattenedData = filteredData.map((item: any) => ({
          ...item,
          'user': item.user.username,
          'book': item.book.title
        }));
      } else {
        // console.log(data);
        flattenedData = data;
      }
      const worksheet = xlsx.utils.json_to_sheet(flattenedData);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, name);
    });
}

export function saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
  type: EXCEL_TYPE
});
  console.log(fileName, 'FILE NAME');
  FileSaver.saveAs(data, fileName + '_export_' + dayjs(new Date()).format('DD/MM/YYYY') + EXCEL_EXTENSION);
}
