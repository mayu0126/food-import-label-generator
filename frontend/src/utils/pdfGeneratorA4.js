import { jsPDF } from 'jspdf';
import euroleaf from '../assets/images/eu-organic-logo.jpg';    
    
    // Generate pdf
    const generatePDFA4 = (formFields) => {
        console.log("generatePDF");

        // Create a new jsPDF instance
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a8', //a7 (74.25 mm * 105 mm), a8 (52.5 mm * 74.25 mm)
        });
        /*
        const addOrganicLogo = (doc) => {
            doc.addImage(
                euroleaf,
                "JPEG",
                50, 100, 24, 16);
            return ""; //organic text??
        }
        addOrganicLogo(doc);
        */
      
        // Calculate the dimensions for each quadrant
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const quadrantWidth = pageWidth / 2;
        const quadrantHeight = pageHeight / 2;

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
    
        //doc.addFileToVFS('calibri.ttf', binaryString);
        //doc.addFont('calibri.ttf', 'calibri', 'normal');
        //doc.setFont('calibri');

        // Start adding content to the PDF
        doc.setFont('times');
        doc.text(`LABEL DETAILS - ${formFields.productName}`, 10, 10);

        doc.setFontSize(10);
        doc.setLanguage('hu');

        // Loop through the formFields and add them to the PDF
        let yOffset = 20;
        for (let field in pdfFormFields) {

            if (pdfFormFields[field]) {
                console.log(field);
                let field_2 = "";

                for (let i = 0; i < 4; i++) {
                    const x = 10 + (i % 2) * quadrantWidth;
                    const y = yOffset + Math.floor(i / 2) * quadrantHeight;

                    if (field === "cookingInstructions") field_2 = "Elkészítési javaslat: "
                    if (field === "ingredientsList") field_2 = "Összetevök: "
                    if (field === "nutritions") field_2 = "Átlagos tápérték 100 g termékben: "
                    if (field === "distributor") field_2 = "Forgalmazza: "
                    if (field === "producer") field_2 = "Gyártja: "
                    if (field === "countryOfOrigin") field_2 = "Származási hely: "
                    if (field === "mainIngredientCOO") field_2 = "A fö összetevö származási helye: "
                    if (field === "bestBeforeText") field_2 = "Minöségét megörzi: "
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

                    // Bold storage
                    if (field === "storage") {
                        doc.setFont("times", "bold");
                        doc.text(`${field_2}`, x, y, { maxWidth: quadrantWidth - 20 });
                        doc.setFont("times", "normal");
                        doc.text(`${pdfFormFields[field]}`, x+14, y, { maxWidth: quadrantWidth - 20 });
                        continue;
                    }

                    // organic logo
                    if (field === "organic") {
                        doc.text(`organic`, x, y, { maxWidth: quadrantWidth - 20 });
                        continue;
                    }

                    doc.text(`${field_2}${pdfFormFields[field]}`, x, y, { maxWidth: quadrantWidth - 20 });
                }
                yOffset += 4 * Math.ceil(doc.getTextDimensions(`${field}: ${pdfFormFields[field]}`, { maxWidth: quadrantWidth - 20 }).h / 5);
            }
        }
        // Save the PDF and open a download dialog
        doc.save('label.pdf');
    };

    export default generatePDFA4;