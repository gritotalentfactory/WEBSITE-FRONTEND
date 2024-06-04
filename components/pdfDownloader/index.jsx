import jsPDF from "jspdf";
import "jspdf-autotable"; // Importing like this to ensure autoTable is registered with jsPDF
import { getCurrentDate } from "@/utils/dateFormat";
export const PDFDownloader = ({ title, myData, header }) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  // Convert data to array of arrays
  // const dataArray = myData.map((row) => Object.values(row));
  const data = myData.map((elt) => [
    elt.user?.name,
    elt.user?.country,
    elt.skill_set,
    elt.user?.gender,
    elt.skill_level,
  ]);
  // Renaming variables to avoid conflicts
  const pdfTitle = title;
  const headers = [header];

  let content = {
    startY: 50,
    head: headers,
    body: data,
  };

  doc.text(pdfTitle, marginLeft, 40);
  doc.autoTable(content);
  doc.save("report.pdf");
};
