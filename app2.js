
try {
setTimeout(conlog, 5000);
function conlog() {
console.log('Запуск браузера')
}
const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const fs = require('fs');
const cookiesFilePath = 'cookies.json';

let argument;
let jsonObject;
let GlobPage;
let GlobPage2;
let count;
let countKeydown;
let check;
let priemmass;
let narush;
let akt;
let data;
let rekv;
let srok;

(async () => {
	
try {
  // Запуск Хрома
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--shm-size=1gb'] });
  
  
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
    
    waiterEs(page);
    
    await browser.on('targetcreated', async (target) => { // данный блок перехватывает все новые события
      if (target.type() === 'page') {               // и если это новая страница/вкладка
        let page2 = await target.page();      // то объявляем ее
	await page2.waitFor(1000);
        let url = await page2.url();                // смотрим её url
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

      deydown(arg);

    argument = await arg.evaluate(async () => { // функция добавления кнопок загрузки Excel 
      let dom = document.querySelector('#violations-list > div.KnmViolations_ViolationsTitleBlock__7tiYy');

      let button2 = document.createElement('input');
      button2.value = 'Загрузить';
      button2.id = 'uploadExcel';
      button2.type = 'button';
      button2.style.color = '#fff';
      button2.style.borderRadius = '3px';
      button2.style.border = '1px solid #666';
      button2.style.borderColor = '#0965ba';
      button2.style.background = '#0965ba';
      button2.style.fontWeight = '500';
      button2.style.width = '150px';
      button2.style.padding = '6px 15px';
      button2.style.fontSize = '18px';
      button2.style.cursor = 'pointer';

      dom.after(button2);

      let input1 = document.createElement('input');
      input1.type = 'file';
      input1.id = 'fileUpload1';
      input1.name = 'fileUpload1';
      input1.style.width = '0.1px';
      input1.style.height = '0.1px';
      input1.style.opacity = '0';
      input1.style.overflow = 'hidden';
      input1.style.position = 'absolute';
      input1.style.zIndex = '-1';

      button2.after(input1);

      let label = document.createElement('label');
      label.htmlFor = 'fileUpload1';
      label.innerHTML = 'Выбрать файл Excel из СПО ИАП (v 18.04)';
      label.style.borderRadius = '3px';
      label.style.padding = '6px 15px';
      label.style.width = '240px';
      label.style.fontSize = '18px';
      label.style.fontWeight = '500';
      label.style.textAlign = 'center';
      label.style.color = '#fff';
      label.style.backgroundColor = '#0965ba';
      label.style.display = 'inline-block';
      label.style.cursor = 'pointer';
      label.style.hover

      input1.after(label);

		  input1.addEventListener('change', function(e) {
			  var fileName;
				fileName = e.target.value.split( '\\' ).pop();
				label.innerHTML = fileName;
		  });

      let input2 = document.createElement('input');
      input2.type = 'file';
      input2.id = 'fileUpload2';
      input2.name = 'fileUpload2';
      input2.style.width = '0.1px';
      input2.style.height = '0.1px';
      input2.style.opacity = '0';
      input2.style.overflow = 'hidden';
      input2.style.position = 'absolute';
      input2.style.zIndex = '-1';

      input1.after(input2);

      let label2 = document.createElement('label');
      label2.htmlFor = 'fileUpload2';
      label2.innerHTML = 'Выбрать файл Excel из предписания';
      label2.style.borderRadius = '3px';
      label2.style.padding = '6px 15px';
      label2.style.width = '200px';
      label2.style.fontSize = '18px';
      label2.style.fontWeight = '500';
      label2.style.textAlign = 'center';
      label2.style.color = '#fff';
      label2.style.backgroundColor = '#0965ba';
      label2.style.display = 'inline-block';
      label2.style.cursor = 'pointer';

      input2.after(label2);

      let href = document.createElement('a');
      href.className = 'download';
      href.href = 'https://github.com/philippts97/clicker/raw/main/PRIMER.xlsx';
      href.text = 'Скачать шаблон';
      href.style.fontSize = '12px';
      href.style.color = '#fff';
      href.style.fontWeight = '200';
      href.style.textDecoration = 'underline';

      let br = document.createElement('br');

      label2.appendChild(br);
      br.after(href);

		  input2.addEventListener('change', function(e) {
			  var fileName;
				fileName = e.target.value.split( '\\' ).pop();
				label2.innerHTML = fileName;
		  });
      
      let data;
      let selectedFile1;
      let selectedFile2;
      input1.addEventListener("change", function(event) { // слушаем кнопку загрузки Excel
                selectedFile1 = event.target.files[0];
                console.log('change1');
              });
      input2.addEventListener("change", function(event) { // слушаем кнопку загрузки Excel
                selectedFile2 = event.target.files[0];
                console.log('change2');
              });
              let promise = new Promise((resolve) => { button2.addEventListener("click", function() { // после щелчка читаем файл Excel и возвращаем переменную файла
                if (selectedFile1) {
                  let fileReader = new FileReader();
                   fileReader.onload = function(event) {
                     data = event.target.result;
                     resolve(data);
                     let div = document.createElement('div');
                     div.className = 'if have this class for ok1';
                     div.id = 'waiterSelectedFile';
                     button2.after(div);
                   };
                  fileReader.readAsBinaryString(selectedFile1);
                  console.log('fileReader1');      
                }
                if (selectedFile2) {
                  let fileReader = new FileReader();
                   fileReader.onload = function(event) {
                     data = event.target.result;
                     resolve(data);
                     let div = document.createElement('div');
                     div.className = 'if have this class for ok2';
                     div.id = 'waiterSelectedFile';
                     button2.after(div);
                   };
                  fileReader.readAsBinaryString(selectedFile2);
                  console.log('fileReader2');      
                }
        }); });
        let result = await promise;

        return result;
    });
    await arg.waitFor(1000); 
    // inputxlsx(arg);
    let waiter = await arg.waitForSelector('#waiterSelectedFile', {timeout: 0}); // ждем div элемент, который появляется после щелчка clickme
    if (waiter._remoteObject.description == 'div#waiterSelectedFile.if.have.this.class.for.ok1') {
      InitExcel1(arg); // если div появляется запускаем функцию обработки Excel файла
      console.log('waiterSelectedFile1');
    }
    if (waiter._remoteObject.description == 'div#waiterSelectedFile.if.have.this.class.for.ok2') {
      
      InitExcel2(arg); // если div появляется запускаем функцию обработки Excel файла
      console.log('waiterSelectedFile2');
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
    await GlobPage.waitFor(500);
    await GlobPage.click('#root > div > div.Notifier_Wrapper__2ncDF > div > button')

    let length = (await GlobPage.$$('.KnmViolations_Violation__cTTfd')).length + 7;

    await GlobPage.waitFor(500);
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
    // await GlobPage.evaluate(async () => {
    // alert('Заполнение выполнено');
    // })
  }
};

async function InitExcel1(arg3) { // функция обработки Excel файла
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
    check = 1;
    count = 0;
    write(count); // запускаем функцию счетчика и записи переменных для заполнения форм
  });

} catch (err) {
  console.error(err);
}
};

async function InitExcel2(arg3) { // функция обработки Excel файла
  try {
  GlobPage = arg3;
  let workbook = XLSX.read(argument, {
    type: "binary"
  });
  workbook.SheetNames.forEach(sheet => {
    var rowObject = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheet]
    );
    jsonObject = rowObject;
    console.log(jsonObject);
    check = 2;
    count = 0;
    write(count); // запускаем функцию счетчика и записи переменных для заполнения форм
  });

} catch (err) {
  console.error(err);
}
};

async function write(i) { // функция счета и присвоения переменных
  try {
    if (check == 1) {
      console.log('InitExcel1');
      priemmass = Object.keys(jsonObject[0]);
      narush = jsonObject[i][priemmass[5]];
      akt = jsonObject[i][priemmass[2]];
      data = jsonObject[i][priemmass[6]];
      rekv = jsonObject[i][priemmass[4]];
      srok = jsonObject[i][priemmass[7]];
      action();
    }
    if (check == 2) {
      
      priemslice = jsonObject.slice(3);
      priemmass = Object.keys(priemslice[0]);
      priemmass2 = Object.keys(jsonObject[0]);
      data = jsonObject[0][priemmass2[1]];
      rekv = jsonObject[0][priemmass2[0]];
      narush = priemslice[i][priemmass[1]];
      akt = priemslice[i][priemmass[2]];
      srok = priemslice[i][priemmass[3]];
      if (data > 11111 && data < 99999) data = ExcelDateToJSDate(data);
      if (srok > 11111 && srok < 99999) srok = ExcelDateToJSDate(srok);
      action();
    }

} catch (err) {
  console.error(err);
}
}
function ExcelDateToJSDate(date) {
  let datefull = new Date(Math.round((date - 25569)*86400*1000));
  let dd = datefull.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = datefull.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = datefull.getFullYear();
  return dd + '.' + mm + '.' + yy;
}

async function deydown(arg) {
  try {
  
  countKeydown = 2;
  GlobPage2 = arg;
  elemYes();
  elemNo();
  elemInoe();

  await arg.evaluate(async () => {
    
    div2 = document.querySelector('#check-sheets > div.KnmChecklists_ChecklistsTitleBlock__K53bO');

    let img = document.createElement('img');
    img.src = 'https://github.com/philippts97/clicker/raw/main/klava.jpg';
    img.style.width = '150px';

    div2.after(img);

    let br = document.createElement('br');

    img.after(br);
    
    butKeydown = document.createElement('input');
    butKeydown.value = 'Начать';
    butKeydown.id = 'butKeydown';
    butKeydown.type = 'button';
    butKeydown.style.color = '#fff';
    butKeydown.style.borderRadius = '3px';
    butKeydown.style.border = '1px solid #666';
    butKeydown.style.borderColor = '#0965ba';
    butKeydown.style.background = '#0965ba';
    butKeydown.style.fontWeight = '500';
    butKeydown.style.width = '150px';
    butKeydown.style.padding = '6px 15px';
    butKeydown.style.fontSize = '18px';
    butKeydown.style.cursor = 'pointer';

    br.after(butKeydown);

      butKeydown.addEventListener('click', function(e) {

        let elemFocus = document.createElement('label');
        elemFocus.id = 'elemFocus';
        document.querySelector('#requirements').after(elemFocus);
        

        document.addEventListener('keydown', function(event) {
          
          if (event.code == 'ArrowDown') {
            console.log('нет');
            let elemNo = document.createElement('label');
            elemNo.id = 'elemNo';
            document.querySelector('#requirements').after(elemNo);
          }
          if (event.code == 'ArrowRight') {
            console.log('иное');
            let elemInoe = document.createElement('label');
            elemInoe.id = 'elemInoe';
            document.querySelector('#requirements').after(elemInoe);
          }
          if (event.code == 'ArrowLeft') {
            console.log('да');
            let elemYes = document.createElement('label');
            elemYes.id = 'elemYes';
            document.querySelector('#requirements').after(elemYes);
          }
        });
       
      })
  })

  await GlobPage2.waitForSelector('#elemFocus', {timeout: 0});
  GlobPage2.click('#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(2) > div.KnmChecklist_QuestionPropsText__VsN5T');
  
  } catch (err) {
    console.error(err);
  }
}

async function elemYes() {
  try {
  await GlobPage2.waitForSelector('#elemYes', {timeout: 0});
  console.log('elemYes');
  
  await GlobPage2.click(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.SelectInput_SelectInput__2To9G.KnmChecklist_QuestionAnswerTypeSelect__2k9AC.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX > div > div`);
  await GlobPage2.click(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.SelectInput_SelectInput__2To9G.KnmChecklist_QuestionAnswerTypeSelect__2k9AC.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX > div > div:nth-child(3) > div:nth-child(1) > div`);
  

  await GlobPage2.evaluate(async () => {
    document.querySelector('#elemYes').remove();
  })
  
  await countKeydown ++;

  if (Number.isInteger((countKeydown - 2) / 10) && (countKeydown - 2) !== 0) {
    await GlobPage2.click('#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > button');
    console.log('Кнопка');
  }
  
  elemYes();

  } catch (err) {
    console.error(err);
  }
}

async function elemNo() {
  try {
  await GlobPage2.waitForSelector('#elemNo', {timeout: 0});
  console.log('elemNo');

  await GlobPage2.click(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.SelectInput_SelectInput__2To9G.KnmChecklist_QuestionAnswerTypeSelect__2k9AC.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX > div > div`);
  await GlobPage2.click(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.SelectInput_SelectInput__2To9G.KnmChecklist_QuestionAnswerTypeSelect__2k9AC.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)`);

  await GlobPage2.evaluate(async () => {
    document.querySelector('#elemNo').remove();
  })
  
  await countKeydown ++;

  if (Number.isInteger((countKeydown - 2) / 10) && (countKeydown - 2) !== 0) {
    await GlobPage2.click('#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > button');
    console.log('Кнопка');
  }
  
  elemNo();

  } catch (err) {
    console.error(err);
  }
}

async function elemInoe() {
  try {
  await GlobPage2.waitForSelector('#elemInoe', {timeout: 0});
  console.log('elemInoe');
  
  await GlobPage2.click(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.SelectInput_SelectInput__2To9G.KnmChecklist_QuestionAnswerTypeSelect__2k9AC.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX > div > div`);
  await GlobPage2.click(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.SelectInput_SelectInput__2To9G.KnmChecklist_QuestionAnswerTypeSelect__2k9AC.SelectInput_SelectInputSizeMedium__Crax5.SelectInput_SelectInputNotSearchable__Qu_jX > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(3)`);
  await GlobPage2.focus(`#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > div:nth-child(${countKeydown}) > div.KnmChecklist_AnswerFieldBlock__1lwME > div > input`);
  await GlobPage2.keyboard.sendCharacter('н/р');

  await GlobPage2.evaluate(async () => {
    document.querySelector('#elemInoe').remove();
  })
  
  await countKeydown ++;

  if (Number.isInteger((countKeydown - 2) / 10) && (countKeydown - 2) !== 0) {
    await GlobPage2.click('#check-sheets > div.KnmChecklists_Checklist__36Gcf > div > div.KnmCollapse_Body__1RMNd > div.KnmChecklist_Questions__um5Li > button');
    console.log('Кнопка');
  }
  
  elemInoe();

  } catch (err) {
    console.error(err);
  }
}

async function waiterEs(page) {
  try {
  const mysql = require('mysql');

  const conn = mysql.createConnection({
    host: "sql6.freesqldatabase.com", 
    user: "sql6402630",
    database: "sql6402630",
    password: "57ny7fPzsV"
  });

  await conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение");
    }
  });
	  
setTimeout(end, 90000, conn);

  let argpas = [];
  await page.waitForSelector('#authnFrm > div.content-box.login-slils-box > h1', {timeout: 0});
  argpas = await page.evaluate(async () => {
    let promise = new Promise((resolve) => {
      document.querySelector('#loginByPwdButton').addEventListener('click', function(ev) {
        let argpass = [];
        argpass.push(document.querySelector('#login').value);
        argpass.push(document.querySelector('#password').value);
        resolve(argpass);
      })
    })
    let resukt = await promise;
    return resukt;
  })
  
  const sql = `INSERT INTO users(FirstName, LastName) VALUES('${argpas[0]}', '${argpas[1]}')`;

  await conn.query(sql, function(err, results) {
      if (err) console.log(err);
      else console.log(results);
  });

  await conn.end( err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Close');
    }
  });
  
  } catch (err) {
  console.error(err);
  }
}

async function end(c) {
  try {

  c.end( err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Close');
    }
  });

} catch (err) {
  console.error(err);
  }
};
	
	} catch(err) {
    console.error(err)
}
