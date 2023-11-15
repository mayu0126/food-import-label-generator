import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
//import axios from 'axios';
import { saveAs } from 'file-saver';
const euroleaf = '...';  // Add the actual path to the image file

const generatePDF = async (formFields) => {
  console.log('generatePDF');

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Use a Unicode font
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  page.setFont(font);

  const { width, height } = page.getSize();

  /*const addOrganicLogo = async () => {
    const imagePath = 'https://www.fibl.org/fileadmin/news_images/eu-logo.jpg';
    const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
    const image = await pdfDoc.embedJpg(response.data);
    page.drawImage(image, { x: 50, y: height - 100, width: 24, height: 16 });
  };

  await addOrganicLogo();

  */
  function replaceSpecialCharacters(str) {

    if (typeof str !== 'string') {
      return str; //if not string, return the original value
    }

    return str.replace(/[űŰőŐ]/g, function(match) {
      switch (match) {
        case 'ű': return 'û';
        case 'Ű': return 'Û';
        case 'ő': return 'õ';
        case 'Ő': return 'Õ';
        default: return match;
      }
    });
  }

  const pdfFormFields = {
    productName: formFields.productName,
    legalName: formFields.legalName,
    allergens: formFields.allergens,
    legalNameAdditionalInformation: formFields.legalNameAdditionalInformation,
    cookingInstructions: formFields.cookingInstructions,
    ingredientsList: formFields.ingredientsList,
    ingredientsListAdditionalInformation: formFields.ingredientsListAdditionalInformation,
    mayContain: formFields.mayContain,
    nutritions: formFields.nutritions,
    producer: formFields.producer,
    distributor: formFields.distributor,
    countryOfOrigin: formFields.countryOfOrigin,
    mainIngredientCOO: formFields.mainIngredientCOO,
    bestBeforeText: formFields.bestBeforeText,
    storage: formFields.storage,
    bestBeforeAdditionalInformation: formFields.bestBeforeAdditionalInformation,
    netWeight: formFields.netWeight,
    netVolume: formFields.netVolume,
    organic: formFields.organic,
    healthMark: formFields.healthMark,
    ean: formFields.ean,
  };

  for (const key in pdfFormFields) {
    if (pdfFormFields.hasOwnProperty(key)) {
      pdfFormFields[key] = replaceSpecialCharacters(pdfFormFields[key]);
    }
  }
  
  page.drawText(`LABEL DETAILS - ${pdfFormFields.productName}`, { x: 10, y: height - 30, fontSize: 7 });

  let yOffset = height - 50;

  for (let field in pdfFormFields) {
    if (pdfFormFields[field]) {
      console.log(field);
      let field_2 = '';

      const x = 10;
      const y = yOffset;

      if (field === 'cookingInstructions') field_2 = 'Elkészítési javaslat: ';
      if (field === "ingredientsList") field_2 = "Összetevõk: "
      if (field === "nutritions") field_2 = "Átlagos tápérték 100 g termékben: "
      if (field === "distributor") field_2 = "Forgalmazza: "
      if (field === "producer") field_2 = "Gyártja: "
      if (field === "countryOfOrigin") field_2 = "Származási hely: "
      if (field === "mainIngredientCOO") field_2 = "A fõ összetevõ származási helye: "
      if (field === "bestBeforeText") field_2 = "Minõségét megõrzi: "
      if (field === "storage") field_2 = "Tárolás: "
      if (field === "netWeight") field_2 = "Nettó tömeg: "
      if (field === "netVolume") field_2 = "Nettó térfogat: "

      // organic logo
      /*
      if (field === 'organic') {
          const imagePath = 'https://www.fibl.org/fileadmin/news_images/eu-logo.jpg';
          const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
          const image = await pdfDoc.embedJpg(response.data);
          page.drawImage(image, { x: 40, y: y - 10, width: 10, height: 7 });
  
          page.drawText('organic', { x: 40, y: y, fontSize: 8, color: rgb(0, 0, 0) });
  
          yOffset -= 10; // Adjusting yOffset to avoid overlapping
          continue;
        }
      */
        const text = `${field_2}${pdfFormFields[field]}`;
        const textWidth = font.widthOfTextAtSize(text, 7);
  
        // Check if the text exceeds the width of the page
        if (x + textWidth > width - 10) {
          yOffset -= 24; // Move to the next line
        }
  
        page.drawText(text, { x: 10, y: yOffset, fontSize: 7, color: rgb(0, 0, 0) });
        yOffset -= 24; // adjusting yOffset for the next line
    }
  }
          
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'label.pdf');
};

    export default generatePDF;