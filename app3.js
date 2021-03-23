const chromeLauncher = require('chrome-launcher');
const axios = require('axios');
const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const fs = require('fs');
const http = require('https');
const cookiesFilePath = 'cookies.json';

let argument;
let jsonObject;
let GlobPage;
let count;
let priemmass;
let narush;
let akt;
let data;
let rekv;
let srok;

// var download = async function(url, dest, cb) {
//   var file = fs.createWriteStream(dest);
//   var request = http.get(url, function(response) {
//     response.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);  // close() is async, call cb after close completes.
//     });
//   })
// };



(async () => {


//   await download('https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg', 'file.jpg', 
//     console.log('done')
// );

  // Запуск Хрома
  const chrome = await chromeLauncher.launch({
  // startingUrl: 'https://private.proverki.gov.ru/',
    ignoreDefaultFlags: true,

  });
  const response = await axios.get(`http://localhost:${chrome.port}/json/version`);
  const { webSocketDebuggerUrl } = response.data;

  // Присоединения puppeteer к Хрому
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl, defaultViewport: null, args: ['--shm-size=1gb'] });
  try {
  
    const page = await browser.newPage(); // Новая страница

    const previousSession = fs.existsSync(cookiesFilePath);
    if (previousSession) {
      // If file exist load the cookies
      const cookiesString = fs.readFileSync(cookiesFilePath);
      const parsedCookies = JSON.parse(cookiesString);
      if (parsedCookies.length !== 0) {
        for (let cookie of parsedCookies) {
          await page.setCookie(cookie)
        }
        console.log('Session has been loaded in the browser')
      }
    }
    
    await page.goto('https://private.proverki.gov.ru/', {waitUntil: 'networkidle2', timeout: 0}); // Переход на сайт ЕРП
    await browser.on('targetcreated', async (target) => { // данный блок перехватывает все новые события
      if (target.type() === 'page') {               // и если это новая страница/вкладка
        let page2 = await target.page();      // то объявляем ее
        let url = page2.url();                // смотрим её url
        console.log(url.search('https://private.proverki.gov.ru/private/knm/'));
        if (url.search('https://private.proverki.gov.ru/private/knm/') == 0){     // и если он не совпадает с нашим запускаем функцию добавления кнопок
          main(page2);
        }
      }
    });

  } 
  catch(err){
    console.log(err)
  }
  
})();

async function main(arg) { // функция добавления кнопки click
  try {
    await arg.waitForSelector('.Button_Button__1Lgtt.Button_ButtonPrimary__16bJT.shared_AddButton__2KCtS.ButtonPrimary.Button_ButtonLarge__2nYMX.Button_ButtonLink__1HIst', {timeout: 0})
    // Save Session Cookies
    const cookiesObject = await arg.cookies();
    // Write cookies to temp file to be used in other profile pages
    fs.writeFile(cookiesFilePath, JSON.stringify(cookiesObject),
    function(err) { 
      if (err) {
        console.log('The file could not be written.', err)
      }
      console.log('Session has been successfully saved')
      })
    argument = await arg.evaluate(async () => { // функция добавления кнопок загрузки Excel 
      let dom = document.getElementById('violations-list').getElementsByTagName('button')[0];

      let button2 = document.createElement('input');
      button2.innerHTML = "LOAD";
      button2.id = 'uploadExcel';
      button2.type = 'button';
      // button2.type = 'button';
      dom.after(button2);
      let input1 = document.createElement('input');
      input1.type = 'file';
      input1.id = 'fileUpload1';
      button2.after(input1);
      
      let data = 5;
      let selectedFile1;
      let selectedFile2;
      input1.addEventListener("change", function(event) { // слушаем кнопку загрузки Excel
                selectedFile1 = event.target.files[0];
                console.log('change');
              });
              let promise = new Promise((resolve) => { button2.addEventListener("click", function() { // после щелчка читаем файл Excel и возвращаем переменную файла
                if (selectedFile1) {
                  let fileReader = new FileReader();
                   fileReader.onload = function(event) {
                     data = event.target.result;
                     console.log('click');
                     resolve(data);
                     

                   };
                  fileReader.readAsBinaryString(selectedFile1);
                  console.log('fileReader');
                  
           }
        }); });
        let result = await promise;

        let div = document.createElement('div');
        div.className = 'if have this class for ok';
        button2.after(div);

        return result;
    });
    await arg.waitFor(1000); 
    // inputxlsx(arg);
    let waiter = await arg.waitForSelector('.if.have.this.class.for.ok', {timeout: 0}); // ждем div элемент, который появляется после щелчка clickme
    if (waiter._remoteObject.description == 'div.if.have.this.class.for.ok') {
      InitExcel(arg); // если div появляется запускаем функцию обработки Excel файла
    }

  } catch (err) {
    console.error(err);
  }
};

async function action() { // функция выполнения действия на странице
  try {
    await GlobPage.click('#violations-list > div.KnmViolations_ViolationsTitleBlock__7tiYy > button');
    await GlobPage.waitFor(500);
    await GlobPage.click('#root > div > header > div > div.KnmHeaderButtons_Container__SsncO.Header_KnmButtons__2lMzg > button.Button_Button__1Lgtt.Button_ButtonPrimary__16bJT.ButtonPrimary.Button_ButtonLarge__2nYMX.Button_ButtonContained__3Dwdt');
    await GlobPage.click('#root > div > div.Notifier_Wrapper__2ncDF > div > button');

    let length = (await GlobPage.$$('.KnmViolations_Violation__cTTfd')).length + 1;

    await GlobPage.click(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div:nth-child(1) > div.SelectInput_SelectInput__2To9G.shared_RowField__3BEY0.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX.SelectInput_SelectInputInvalid__19bQ3 > div.SelectInput_SelectContainer__is2XB.select-field-container.select-field-container--size-medium.css-0 > div > div.SelectInput_ValueContainer__1qsWx.SelectInput_ValueContainerSingle__2ugfy.select-field__value-container.css-0`);
    await GlobPage.click(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div:nth-child(1) > div.SelectInput_SelectInput__2To9G.shared_RowField__3BEY0.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX.SelectInput_SelectInputInvalid__19bQ3 > div.SelectInput_SelectContainer__is2XB.select-field-container.select-field-container--size-medium.css-0 > div.select-field__menu.css-0 > div:nth-child(1) > div:nth-child(1)`);
    
    await GlobPage.click(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div:nth-child(3) > div.SelectInput_SelectInput__2To9G.shared_RowField__3BEY0.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX.SelectInput_SelectInputInvalid__19bQ3 > div.SelectInput_SelectContainer__is2XB.select-field-container.select-field-container--size-medium.css-0 > div > div.SelectInput_ValueContainer__1qsWx.SelectInput_ValueContainerSingle__2ugfy.select-field__value-container.css-0`);
    await GlobPage.click(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div:nth-child(3) > div.SelectInput_SelectInput__2To9G.shared_RowField__3BEY0.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX.SelectInput_SelectInputInvalid__19bQ3 > div.SelectInput_SelectContainer__is2XB.select-field-container.select-field-container--size-medium.css-0 > div.select-field__menu.css-0 > div:nth-child(1) > div:nth-child(1)`);
    
    await GlobPage.focus(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_FieldRow__26zLD.KnmViolations_NoteFieldBlock__2tsNE > div.Textarea_Textarea__2qL3b.Textarea_ResizeHorizontal__1DeEf.shared_RowField__3BEY0.Textarea_TextareaInvalid__1F75c.Textarea_TextareaAutoHeight__2vqgL > textarea`);
    await GlobPage.keyboard.sendCharacter(narush);
    
    await GlobPage.click(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_FieldLabel__3uNgv.KnmViolations_LegalBasesTitle__2d-6F > button`);
    await GlobPage.waitForSelector('body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered.Modal_Modal__3NIyR > div > div.ant-modal-content > div > div.LegalBasesModal_Body__PRgZ9 > div > form > div:nth-child(2) > div:nth-child(2) > div > label', {timeout: 0});
    await GlobPage.click('body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered.Modal_Modal__3NIyR > div > div.ant-modal-content > div > div.LegalBasesModal_Body__PRgZ9 > div > form > div:nth-child(2) > div:nth-child(2) > div > label');
    await GlobPage.waitForSelector('body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered.Modal_Modal__3NIyR > div > div.ant-modal-content > div > div.LegalBasesModal_Body__PRgZ9 > div > form > div.Textarea_Textarea__2qL3b.Textarea_ResizeHorizontal__1DeEf.LegalBasesForm_Textarea__21sB4.Textarea_TextareaAutoHeight__2vqgL > textarea', {timeout: 0});
    await GlobPage.focus('body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered.Modal_Modal__3NIyR > div > div.ant-modal-content > div > div.LegalBasesModal_Body__PRgZ9 > div > form > div.Textarea_Textarea__2qL3b.Textarea_ResizeHorizontal__1DeEf.LegalBasesForm_Textarea__21sB4.Textarea_TextareaAutoHeight__2vqgL > textarea');
    await GlobPage.keyboard.sendCharacter(akt);
    await GlobPage.click('body > div:nth-child(6) > div > div.ant-modal-wrap.ant-modal-centered.Modal_Modal__3NIyR > div > div.ant-modal-content > div > div.LegalBasesModal_Footer__1CfPr > button.Button_Button__1Lgtt.Button_ButtonPrimary__16bJT.ButtonPrimary.Button_ButtonMedium__ceNq9.Button_ButtonContained__3Dwdt');

    await GlobPage.waitFor(500);
    await GlobPage.click(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_FieldLabel__3uNgv.KnmViolations_InjunctionsTitle__22Tnw > button`);
    await GlobPage.waitForSelector(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_DeletingRow__nhJjr.KnmViolations_Injunction__13_XA > div > div.shared_FieldRow__26zLD.KnmViolations_InjunctionCodeFieldBlock__3KFph > div.Textarea_Textarea__2qL3b.Textarea_ResizeHorizontal__1DeEf.shared_RowField__3BEY0.Textarea_TextareaAutoHeight__2vqgL > textarea`);
    await GlobPage.focus(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_DeletingRow__nhJjr.KnmViolations_Injunction__13_XA > div > div.shared_FieldRow__26zLD.KnmViolations_InjunctionCodeFieldBlock__3KFph > div.Textarea_Textarea__2qL3b.Textarea_ResizeHorizontal__1DeEf.shared_RowField__3BEY0.Textarea_TextareaAutoHeight__2vqgL > textarea`);
    await GlobPage.keyboard.sendCharacter(rekv);
    await GlobPage.focus(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_DeletingRow__nhJjr.KnmViolations_Injunction__13_XA > div > div.shared_FieldRow__26zLD.KnmViolations_InjunctionAppointmentDateFieldBlock__1-2St > div.DatePicker_DatePicker__3re1A.shared_RowField__3BEY0 > div > div:nth-child(1) > div > input`);
    await GlobPage.keyboard.sendCharacter(data);
    await GlobPage.focus(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_DeletingRow__nhJjr.KnmViolations_Injunction__13_XA > div > div.shared_FieldRow__26zLD.KnmViolations_InjunctionExecutionDeadlineFieldBlock__2rytS > div.DatePicker_DatePicker__3re1A.shared_RowField__3BEY0 > div > div:nth-child(1) > div > input`);
    await GlobPage.keyboard.sendCharacter(srok);
    await GlobPage.focus(`#violations-list > div:nth-child(${length}) > div > div.KnmCollapse_Body__1RMNd > div.shared_DeletingRow__nhJjr.KnmViolations_Injunction__13_XA > div > div.shared_FieldRow__26zLD.KnmViolations_InjunctionNoteFieldBlock__1zXE2 > div.Textarea_Textarea__2qL3b.Textarea_ResizeHorizontal__1DeEf.shared_RowField__3BEY0.Textarea_TextareaAutoHeight__2vqgL > textarea`);
    await GlobPage.keyboard.sendCharacter(narush);

    count ++;
    write(count);

  } catch (err) {
    console.error(err);
    GlobPage.alert('Заполнение выполнено');
  }
};

async function InitExcel(arg3) { // функция обработки Excel файла
  try {
  GlobPage = arg3;
  let workbook = XLSX.read(argument, {
    type: "binary"
  });
  workbook.SheetNames.forEach(sheet => {
    var rowObject = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheet]
    );
    jsonObject = rowObject.slice(25);
    console.log(jsonObject);
    count = 0;
    write(count); // запускаем функцию счетчика и записи переменных для заполнения форм
  });

} catch (err) {
  console.error(err);
}
};

async function write(i) { // функция счета и присвоения переменных
  try {

  priemmass = Object.keys(jsonObject[0]);
  console.log(priemmass);
  narush = jsonObject[i][priemmass[5]];
  akt = jsonObject[i][priemmass[2]];
  data = jsonObject[i][priemmass[6]];
  rekv = jsonObject[i][priemmass[4]];
  srok = jsonObject[i][priemmass[7]];
  action();

} catch (err) {
  console.error(err);
}
}
