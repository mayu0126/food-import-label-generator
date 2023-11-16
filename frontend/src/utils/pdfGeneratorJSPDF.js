import { jsPDF } from 'jspdf';
//import euroleaf from '../assets/images/eu-organic-logo.jpg';
    
    // Generate pdf
    const generatePDF = async (formFields, printingDetails) => {
        console.log("generatePDF");

        // Create a new jsPDF instance
        const doc = new jsPDF({
            orientation: `${printingDetails.labelOrientation}`, // portrait or landscape
            unit: 'mm',
            format: `${printingDetails.labelSize}` //a6, a7 or a8
            //a7 (74.25 mm * 105 mm), a8 (52.5 mm * 74.25 mm) - x-height min. 0.9 mm - font size: min. 6 pt
            //a6 (105 mm * 148.5 mm) - x-height min 1.2 mm - font size: min. 8 pt (times), min. 7 pt (arial, helvetice, univers)
        });

        
        doc.setFontSize(`${Number(printingDetails.fontSize)}`);
        doc.setLanguage('hu');
        /*
        const addOrganicLogo = (doc) => {
            return doc.addImage(euroleaf, "JPEG", 50, 100, 24, 16)
            
            //return ""; //+organic text??
        }
        addOrganicLogo(doc);
        */

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        function replaceSpecialCharacters(str) {

            if (typeof str !== 'string') {
              return str; // if not string, return the original value
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

        // Loop through the formFields and add them to the PDF
        let yOffset = 5; //distance from the top
        for (let field in pdfFormFields) {

            if (pdfFormFields[field]) {
                //console.log(field);
                let field_2 = "";

                const x = 3
                const y = yOffset

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
                
                //highlight the allergens
                if (field === "ingredientsList") {
                    pdfFormFields[field] = pdfFormFields[field].split(", ").map(word => {
                        console.log(word);
                        if(word.includes("tej")){
                            return word.toUpperCase();
                        }
                        else {
                            return word;
                        }
                    }).join(", ");
                }

                /*
                if (field === "ingredientsList") {
                    pdfFormFields[field] = pdfFormFields[field].split(", ").map(word => {
                        console.log(word);
                        if(word.includes("tej")){
                            doc.setFont("times", "bold")
                            doc.text(word, x2, yOffset, { maxWidth: pageWidth - 5 });
                            x2 += doc.getTextDimensions(word, { maxWidth: pageWidth - 5 }).h;
                            return;
                        }
                        else {
                            doc.setFont("times", "normal")
                            doc.text(word, x2, yOffset, { maxWidth: pageWidth - 5 });
                            x2 += doc.getTextDimensions(word, { maxWidth: pageWidth - 5 }).h;
                            return;
                        }
                    })
                }
                */

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
            
                    // async: reading the image
                    const blob = await fetch(imagePath).then(response => response.blob());
            
                    // async: image base64 coding
                    const imageData = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result.split(',')[1]);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
            
                    // add image to PDF
                    doc.addImage(`data:image/jpeg;base64,${imageData}`,
                        "JPEG",
                        pageWidth < pageHeight ? pageWidth - pageWidth*0.25 : pageWidth - pageWidth*0.20,
                        pageWidth < pageHeight ? pageHeight - pageHeight*0.14 : pageHeight - pageHeight*0.20,
                        pageWidth < pageHeight ? pageWidth*0.17 : pageHeight*0.17,
                        pageWidth < pageHeight ? pageHeight*0.075 : pageWidth*0.075);

                    doc.text(`bio termék`,
                        pageWidth < pageHeight ? pageWidth - pageWidth*0.25 : pageWidth - pageWidth*0.20,
                        pageWidth < pageHeight ? pageHeight - pageHeight*0.04 : pageHeight - pageHeight*0.06,
                        { maxWidth: pageWidth });

                    yOffset += doc.getTextDimensions(`${field}: ${pdfFormFields[field]}`, { maxWidth: pageWidth - 5 }).h;
            
                    continue;
                }
                
                doc.text(`${field_2}${pdfFormFields[field]}`, x, y, { maxWidth: pageWidth - 5 });
                yOffset += doc.getTextDimensions(`${field}: ${pdfFormFields[field]}`, { maxWidth: pageWidth - 5 }).h; //spacing can be set by division
            }
        }
        // save the PDF and open a download dialog
        //doc.save('label.pdf');

        // save the PDF as data URI
        const pdfDataUri = doc.output('datauristring', { filename: 'food-label' });

        // open a new window or tab with the PDF
        const pdfWindow = window.open();
        pdfWindow.document.write('<iframe width="100%" height="100%" src="' + pdfDataUri + '" frameborder="0" style="border: none"></iframe>');

    };

    export default generatePDF;