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

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      const data = await res.json();
      setPhotoData(data);
    }
  }, []);

  if (!photoData) return <div>Loading...</div>;

  return (
    <>


      <ExamplesNavbar />
      <div className="main">
        <div className="section section-dark text-center">
          <Container>
            <Row>
              <Col md="8" className="ml-auto mr-auto">
                <h2 className="title">{photoData.title}</h2>
                <p className="description">{photoData.date}</p>
                <p className="description">{photoData.explanation}</p>
                <div>
                  {photoData.media_type === "image" ? (
                    <img src={photoData.url} alt={photoData.title} className="img-fluid" />
                  ) : (
                    <iframe
                      title="space-video"
                      src={photoData.url}
                      frameBorder={0}
                      gesture="media"
                      allow="encrypted-media"
                      allowFullScreen
                      className="embed-responsive embed-responsive-16by9"
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}
