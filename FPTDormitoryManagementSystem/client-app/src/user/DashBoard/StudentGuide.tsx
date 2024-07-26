import SideBar from "../../features/sidebar/SideBar";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/BookingBed.css";
import "../../assets/DashBoard.css";
import UserNav from "../NavBar/UserNav";
import StudentGuideContent from "../../features/content/StudentGuideContent";


const BookingBed: React.FC = () => {
  return (
    <div className="dashboard-container">
      <UserNav />
      <Container fluid className="dashboard-content">
        <Row>
          <Col xs={2} className="sidebar-col">
            <SideBar />
          </Col>
          <Col xs={10} className="content-col">
            <StudentGuideContent/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookingBed;
