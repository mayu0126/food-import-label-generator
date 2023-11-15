import { jsPDF } from 'jspdf';
import euroleaf from '../assets/images/eu-organic-logo.jpg';
    
    // Generate pdf
    const generatePDF = async (formFields) => {
        console.log("generatePDF");

        // Create a new jsPDF instance
        const doc = new jsPDF({
            orientation: 'portrait', //portrait
            unit: 'mm',
            format: 'a8',
            //a7 (74.25 mm * 105 mm), a8 (52.5 mm * 74.25 mm) - x-height min. 0.9 mm - font size: min. 6 pt
            //a6 (105 mm * 148.5 mm) - x-height min 1.2 mm - font size: min. 8 pt (times), min. 7 pt (arial, helvetice, univers)
        });
        
        const addOrganicLogo = (doc) => {
            return doc.addImage(euroleaf, "JPEG", 50, 100, 24, 16)
            
            //return ""; //+organic text??
        }
        //addOrganicLogo(doc);
        
      
        // Calculate the dimensions for each quadrant
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        /*
        const quadrantWidth = pageWidth / 2;
        const quadrantHeight = pageHeight / 2;
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

        // Collect form data
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
    
        // Add the font directly using addFont
        //doc.addFont('LiberationSerif.ttf', 'LiberationSerif', 'normal');
        //doc.setFont('LiberationSerif');

        // Start adding content to the PDF
        //doc.setFont('times');
        //doc.text(`LABEL DETAILS - ${formFields.productName}`, 10, 10);

        doc.setFontSize(8);
        doc.setLanguage('hu');

        // Loop through the formFields and add them to the PDF
        let yOffset = 5; //distance from the top
        for (let field in pdfFormFields) {

            if (pdfFormFields[field]) {
                console.log(field);
                let field_2 = "";

                //for (let i = 0; i < 4; i++) {
                    const x = 3 //distance from the left side //+ (i % 2) * quadrantWidth;
                    const y = yOffset //+ Math.floor(i / 2) * quadrantHeight;

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

                    // Check if the field contains "tej" and set font style to bold if true
                    /*
                    if (field === "ingredientsList" && pdfFormFields[field].includes("tej")) {
                        doc.setFont("times", "bold");
                    } else {
                        doc.setFont("times", "normal");
                    }
                    */

                    // Bold legal name
                    if (field === "legalName") {
                        doc.setFont("times", "bold");
                    }
                    else {
                        doc.setFont("times", "normal");
                    }

                    /*
                    // Bold storage
                    if (field === "storage") {
                        doc.setFont("times", "bold");
                        doc.text(`${field_2}`, x, y, { maxWidth: pageWidth - 5 });
                        doc.setFont("times", "normal");
                        doc.text(`${pdfFormFields[field]}`, x+14, y, { maxWidth: pageWidth - 5 });
                        continue;
                    }
                    */

                    // organic logo
                    
                    if (field === "organic") {
                        const imagePath = 'https://www.fibl.org/fileadmin/news_images/eu-logo.jpg';
                
                        // Aszinkron művelet: kép beolvasása
                        const blob = await fetch(imagePath).then(response => response.blob());
                
                        // Aszinkron művelet: kép bázis64 kódolása
                        const imageData = await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result.split(',')[1]);
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                
                        // Kép hozzáadása a PDF-hez
                        doc.addImage(`data:image/jpeg;base64,${imageData}`, "JPEG", 40, 60, 10, 7);
                
                        doc.text(`organic`, 40, 70, { maxWidth: pageWidth - 5 });
                        yOffset += doc.getTextDimensions(`${field}: ${pdfFormFields[field]}`, { maxWidth: pageWidth - 5 }).h;
                
                        continue;
                    }
                    

                    doc.text(`${field_2}${pdfFormFields[field]}`, x, y, { maxWidth: pageWidth - 5 });
                //}
                yOffset += doc.getTextDimensions(`${field}: ${pdfFormFields[field]}`, { maxWidth: pageWidth - 5 }).h; //spacing can be set by division
            }
        }
        // Save the PDF and open a download dialog
        doc.save('label.pdf');
    };

    export default generatePDF;