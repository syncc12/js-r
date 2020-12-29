import React from 'react';
import './CoverLetters.scss';
import { GlobalContext } from '../../contexts/global-context';
import { jsPDF } from "jspdf";

class CoverLetters extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      pdfSRC: '',
      clPDF: ''
    };
  }

  coverLetterDownload = () => {
    const { clPDF } = this.state;
    const { jobTitle, company } = this.props;
    clPDF.save(`Cover Letter ${company} - ${jobTitle}.pdf`);
  }
  

  componentDidMount() {
    const { coverLetterText, jobTitle, company } = this.props;
    
    let thisClPDF = new jsPDF();
    const clText = thisClPDF.setFontSize(12).splitTextToSize(coverLetterText,170);
    thisClPDF.text(20,20,clText);
    const thisPDFSRC = thisClPDF.output('datauristring',`${jobTitle} - ${company} cover letter.pdf`);

    this.setState({pdfSRC: thisPDFSRC, clPDF: thisClPDF});
  }
  
  render () {
    const { pdfSRC } = this.state;

    return (
      <>
        <div>
          <div id="cover-letter-download" className="fa fa-download fa-3x" onClick={(() => this.coverLetterDownload())}></div>
        </div>
        <div id="generated-cover-letter">
          <div id="pdf-frame"><iframe title="cover_letter_iframe" id="pdf-iframe" src={pdfSRC}></iframe></div>
        </div>
      </>
    );
  }
}

export default CoverLetters;