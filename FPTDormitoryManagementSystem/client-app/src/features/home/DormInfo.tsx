import { Container, Row, Col, Image } from 'react-bootstrap';
import "../../assets/Site.css";
import "../../assets/landing.css"
import ContentImg1 from '../../assets/content1.png';
import ContentImg2 from '../../assets/content2.png';
import ContentImg3 from '../../assets/content3.png';
const DormInfo = () => {
  return (
    <section id="infoKTX" className="info-KTX">
      <div className="relative">
        <div className="landing-line"></div>
        <div className="d-flex justify-content-center">
          <p className="info-KTX-title">FPT University Dormitory Information</p>
        </div>
      </div>
      <Container className="info-1-layout">
        <Row>
          <Col className="info-1-text d-flex flex-column">
            <p style={{ lineHeight: 1.8 }}>
              FPT University is one of the famous schools providing multidisciplinary training, with training quality meeting international standards. The school not only cares about the quality of training and enrollment but also takes care of student life.
              <br />
              By investing and building a genuine <b style={{ color: '#F36F21' }}>dormitory</b> area. Fully equipped with necessary equipment, airy and clean space. To meet the needs and create the most comfortable learning and living space for students. <b style={{ color: '#F36F21' }}>KTX</b> is also considered the second home of many students.
            </p>
          </Col>
          <Col>
            <Image className="landing-info-img" src={ContentImg1} alt="img-1" fluid />
          </Col>
        </Row>
      </Container>
      <Container className="info-2-layout">
        <Row>
          <Col>
            <Image className="landing-info-img-2" src={ContentImg2} alt="img-2" fluid />
          </Col>
          <Col className="info-1-text d-flex flex-column">
            <div style={{ lineHeight: 1.8 }}>
              <p style={{ fontWeight: 'bold', color: '#F36F21' }}>
                FPT University's dormitory is accommodation exclusively for students of FPT University.
              </p>
              Currently, there is a problem for new students after knowing the university admission results. That is finding a suitable place to live that is both economical and ensures security and a learning environment. Not only new students but also students from previous courses mostly want to stay at <b style={{ color: '#F36F21' }}>KTX</b> campus to facilitate transportation. . And to save costs, there is a school to study and live.
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Image className="landing-info-img-3" src={ContentImg3} alt="img-3" fluid />
            <div style={{ marginTop: 24, lineHeight: 1.8, textAlign: 'justify' }}>
              <p style={{ fontWeight: 'bold', color: '#F36F21', marginBottom: 8 }}>
                FPT University dormitory is built with a modern design, airy and fully equipped.
              </p>
              Area <b style={{ color: '#F36F21' }}>KTX</b> includes buildings. Each <b style={{ color: '#F36F21' }}>KTX</b> building has spacious, clean floors, wifi, vending machines, automatic washing machines and dryers... Surrounded by green trees, fresh, pleasant and airy. Rooms are modernly designed, with comfortable space, suitable for each room type of 3-4-6-8 people. Each room will be equipped with necessary equipment, fully serving the essential needs of students such as bunk beds, study desks, clothes drying racks, water heaters, air conditioners, shoe cabinets, and bathrooms. Separate student for each room... helps students feel secure in studying during their time with FPT University, giving students a comfortable and convenient feeling like being at home.
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default DormInfo;
