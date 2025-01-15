document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const productName = document.getElementById('productName').value;
    const rating = document.getElementById('rating').value;
    const recommend = document.querySelector('input[name="recommend"]:checked').value;
    const improvement = document.getElementById('improvement').value || 'N/A';
    const favoriteFeature = document.getElementById('favoriteFeature').value || 'N/A';
    const email = document.getElementById('email').value;
    const fileUpload = document.getElementById('fileUpload').files[0]
        ? document.getElementById('fileUpload').files[0].name
        : 'No File';

    // Create a new row in the table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${rating}</td>
        <td>${recommend}</td>
        <td>${improvement}</td>
        <td>${favoriteFeature}</td>
        <td>${email}</td>
        <td>${fileUpload}</td>
    `;

    // Append the new row to the table
    document.querySelector('#feedbackTable tbody').appendChild(newRow);

    // Reset the form
    document.getElementById('feedbackForm').reset();
});

document.getElementById('downloadHtmlBtn').addEventListener('click', function() {
    const formHtml = document.getElementById('dataForm').outerHTML;
    const tableHtml = document.getElementById('dataTable').outerHTML;

    const fullHtml = `
        <html>
        <head><title>Form Data</title></head>
        <body>
            ${formHtml}
            ${tableHtml}
        </body>
        </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.html';
    a.click();
    URL.revokeObjectURL(url);
});
