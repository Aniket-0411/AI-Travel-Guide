import React from 'react';
import EmailMeButton from './EmailMe';
import { ConstructionRounded } from '@mui/icons-material';

const TripDocumentGenerator = ({ tripData }) => {
    const generateHTMLDocument = (tripData) => {
        // Extracting data from tripData
        const { from, to, days, responseDetails } = tripData;

        // Function to replace odd instances of ** with <b> and even instances of ** with </b>
        const replaceBoldTags = (text) => {
            let count = 0; // Counter to track instances of **
            return text.replace(/\*\*/g, () => {
                count++; // Increment the counter for each instance of **
                return count % 2 === 1 ? "<b>" : "</b>"; // Replace odd instances with <b> and even instances with </b>
            });
        };
        const boldHandleResponse = replaceBoldTags(responseDetails);

        // Split the text into paragraphs based on newline characters
        const paragraphs = boldHandleResponse.split('\n');

        // Generating HTML document
        const htmlDocument = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Trip Itinerary</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        padding: 20px;
                    }
                    h1 {
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    p {
                        font-size: 16px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Trip Itinerary</h1>
                    <p><strong>From:</strong> ${from}</p>
                    <p><strong>To:</strong> ${to}</p>
                    <p><strong>Duration:</strong> ${days} days</p>
                    <p><strong>Details:</strong><br>
                        <div>
                        ${paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
                        </div>
                    </p>
                </div>
            </body>
            </html>
        `;

        return htmlDocument;
    };

    const htmlDocument = generateHTMLDocument(tripData);
    return (
        <div>
            {htmlDocument && (
                <EmailMeButton dataToSend={htmlDocument} />
            )}
        </div>
    );
};

export default TripDocumentGenerator;
