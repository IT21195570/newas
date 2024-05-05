import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

const apiKey = process.env.REACT_APP_NASA_KEY;
const roverName = "curiosity"; 
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${apiKey}`;

export default function MarsRoverPhotos() {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPhotoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, []);

  if (!photoData) return <div>Loading...</div>;

  // Group photos by camera
  const photosByCamera = {};
  photoData.latest_photos.forEach((photo) => {
    const cameraName = photo.camera.full_name;
    if (!photosByCamera[cameraName]) {
      photosByCamera[cameraName] = [];
    }
    photosByCamera[cameraName].push(photo);
  });

  return (
    <>
      <ExamplesNavbar />
      <div className="main">
        <div className="section section-dark text-center">
          <Container>
            {Object.entries(photosByCamera).map(([cameraName, photos]) => (
              <div key={cameraName} style={{ marginBottom: "30px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white", marginTop: "20px", marginBottom: "10px" }}>{cameraName}</h2>
                <Row>
                  {photos.map((photo) => (
                    <Col md="4" key={photo.id}>
                      <Card>
                        <img src={photo.img_src} alt={photo.id} className="card-img-top" />
                        <CardBody>
                          <CardTitle>{photo.id}</CardTitle>
                          <CardText>
                            <strong>Earth Date:</strong> {photo.earth_date}<br />
                            <strong>Sol:</strong> {photo.sol}<br />
                            <strong>Camera:</strong> {photo.camera.full_name}<br />
                            <strong>Rover:</strong> {photo.rover.name}
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Container>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}
