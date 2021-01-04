import React from 'react';
import './CoverLetters.scss';
import { GlobalContext } from '../../contexts/global-context';
import { jsPDF } from "jspdf";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CoverLetters extends React.Component {
  static contextType = GlobalContext;


  convertToPDF = (inCoverLetterText) => {
    let thisClPDF = new jsPDF();
    const clText = thisClPDF.setFontSize(12).splitTextToSize(inCoverLetterText,170);
    return thisClPDF.text(20,20,clText);
  }

  coverLetterDownload = (e) => {
    const { jobTitle, company } = this.props;

    const currentCLText = e.target.getElementsByTagName('textarea')[0].value;

    const clPDF = this.convertToPDF(currentCLText);

    clPDF.save(`Cover Letter ${company} - ${jobTitle}.pdf`);
    e.preventDefault();
  }

  
  render () {
    const { coverLetterText } = this.props;

    return (
      <>
        <div>
          <div id="cover_letter-frame">
            <Form onSubmit={((e) => this.coverLetterDownload(e))}>
              <Form.Group>
                <Form.Row>
                  <Col xs={12}>
                    <Form.Control id="cover_letter-text" as="textarea" defaultValue={coverLetterText !== undefined ? coverLetterText : ''} rows={15} />
                  </Col>
                </Form.Row>
              </Form.Group>
              <Button variant="primary" type="submit" size="lg">
                <FontAwesomeIcon icon={['fad','download']} />
              </Button>
            </Form>
          </div>

        </div>
      </>
    );
  }
}

export default CoverLetters;