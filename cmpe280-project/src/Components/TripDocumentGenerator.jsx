import React from 'react';
import EmailMeButton from './EmailMe';

const TripDocumentGenerator = ({ tripData }) => {
    const generateHTMLDocument = (tripData) => {
        // Extracting data from tripData
        const { from, to, days, responseDetails } = tripData;

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
                    <p><strong>Details:</strong><br>${responseDetails}</p>
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
