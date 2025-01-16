const fieldTable = document.querySelector("#fieldTable tbody");
const htmlOutput = document.getElementById("htmlOutput");
const generatedHTML = document.getElementById("generatedHTML");
const downloadBtn = document.getElementById("downloadBtn");

function addField() {
  const fieldName = document.getElementById("fieldName").value;
  const fieldType = document.getElementById("fieldType").value;
  const isRequired = document.getElementById("isRequired").checked;

  if (!fieldName) {
    alert("Please enter a field name.");
    return;
  }

  // Add field to the table
  const row = fieldTable.insertRow();
  row.innerHTML = `
    <td>${fieldName}</td>
    <td>${fieldType}</td>
    <td>${isRequired ? "Yes" : "No"}</td>
  `;

  // Clear the form fields after adding the row
  document.getElementById("fieldName").value = '';
  document.getElementById("fieldType").value = 'text';
  document.getElementById("isRequired").checked = false;
}

function generateHTML() {
  let formHTML = '<form>\n';
  const rows = fieldTable.rows;

  for (let i = 0; i < rows.length; i++) {
    const fieldName = rows[i].cells[0].innerText;
    const fieldType = rows[i].cells[1].innerText.toLowerCase();
    const isRequired = rows[i].cells[2].innerText === "Yes" ? "required" : "";

    if (fieldType === 'textarea') {
      formHTML += `  <label for="${fieldName}">${fieldName}</label>\n`;
      formHTML += `  <textarea id="${fieldName}" name="${fieldName}" ${isRequired}></textarea>\n`;
    } else {
      formHTML += `  <label for="${fieldName}">${fieldName}</label>\n`;
      formHTML += `  <input type="${fieldType}" id="${fieldName}" name="${fieldName}" ${isRequired} />\n`;
    }
  }

  formHTML += '</form>';

  // Wrap the form HTML inside a basic HTML structure
  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Form</title>
</head>
<body>
  ${formHTML}
</body>
</html>`;

  // Show the generated HTML in the output section
  htmlOutput.textContent = fullHTML;
  generatedHTML.style.display = "block";

  // Handle download functionality
  downloadBtn.onclick = function () {
    const blob = new Blob([fullHTML], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_form.html";  // Set the name of the downloaded file
    link.click();  // Trigger the download action
  };
}
