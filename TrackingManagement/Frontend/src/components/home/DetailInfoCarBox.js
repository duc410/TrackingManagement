import { Row, Col, Tabs, Modal, Tag, Badge, Avatar } from "antd";
import "./detailInfoCarBox.css";
import { makeFileRequest }from "../../utils/makeRequest"
import moment from "moment";
import { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(...registerables);

const DetailInfoCarBox = ({ carInfo, units }) => {
  const [selectedCarImage, setSelectedCarImage] = useState("1");
  const [assets, setAssets] = useState({
    imageCam1: null,
  });

  const onValueChange = (event) => {
    setSelectedCarImage(event.target.value);
  };

  const getSevenDaysBefore = () => {
    let sevenDaysBefore = [];
    let dateNow = moment();

    for (let i = 6; i >= 0; i--) {
      let newDay = dateNow.clone().subtract(i, "days");
      sevenDaysBefore.push(newDay.format("DD/MM"));
    }
    return sevenDaysBefore;
  };

  useEffect(() => {
    const getAssets = async () => {
      const [imageCam1BlobRs] = await Promise.all([
        makeFileRequest ({
          method: "GET",
          url: "http://localhost:5000/api/onlines/car-image",
          params: {
            carId: carInfo.car.id,
            imageNum: selectedCarImage,
          },
        }),
      ]);
      setAssets({ imageCam1: URL.createObjectURL(imageCam1BlobRs) });
    };
    getAssets();
  }, [carInfo.car.id, selectedCarImage]);

  return (
    <>
      <Row
        style={{ height: "100%", marginBottom: "4vh" }}
        align="top"
        gutter={[48, 48]}
      >
        <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ margin: "auto" }}>
          <div className="car-detail-info">
            <table style={{ margin: "auto", width: "100%", height: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "190px" }}>Biển số xe</td>
                  <td>{carInfo.car.licensePlate}</td>
                </tr>
                <tr>
                  <td>Loại xe</td>
                  <td>{carInfo.car.type}</td>
                </tr>
                <tr>
                  <td>Đơn vị</td>
                  <td>
                    {
                      units.filter((item) => item.id === carInfo.car.unitId)[0]
                        .name
                    }
                  </td>
                </tr>
                <tr>
                  <td>Tuyến</td>
                  <td>{carInfo.route ? carInfo.route : ""}</td>
                </tr>
                <tr>
                  <td>Lần cuối bảo trì</td>
                  <td>18-10-2016</td>
                </tr>
                <tr>
                  <td>Thời hạn bảo hiểm</td>
                  <td>21-09-2018</td>
                </tr>
                <tr>
                  <td>Thời hạn đăng kiểm</td>
                  <td>10-10-2018</td>
                </tr>
                <tr>
                  <td>Tổng số km trong ngày</td>
                  <td>0 (km)</td>
                </tr>
                <tr>
                  <td>Tổng thời gian chạy trong ngày</td>
                  <td>0 (phút)</td>
                </tr>
                <tr>
                  <td>Tổng số cảnh báo trong ngày</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Tổng số tuyến trong ngày</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ margin: "auto" }}>
          <div className="camera-img">
            <img src={assets.imageCam1} alt="cameraimage"></img>
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ margin: "auto" }}>
          <div className="rad_image_car">
            <form id="choose-image">
              <Row>
                <Col span={12}>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="1"
                        checked={selectedCarImage === "1"}
                        onChange={onValueChange}
                      />
                      Khoang lái
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className="radio"
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    <label>
                      <input
                        type="radio"
                        value="2"
                        checked={selectedCarImage === "2"}
                        onChange={onValueChange}
                      />
                      Khoang két
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="check-box">
                  <label>
                    <input type="checkbox" />
                    Trong ngày
                  </label>
                </div>
              </Row>
              <Row>
                <div className="choose-day-from">
                  <Col>
                    <label for="from-time">Từ</label>
                  </Col>
                  <Col span={1}>
                    <input
                      id="date-time1"
                      type="datetime-local"
                      name="from-time"
                    />
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="choose-day-to">
                  <Col>
                    <label for="to-time">Đến</label>
                  </Col>
                  <Col span={1}>
                    <input type="datetime-local" name="to-time" />
                  </Col>
                </div>
              </Row>
              <Row>
                <input type="button" value="Yêu cầu" />
              </Row>
            </form>
          </div>
        </Col>
      </Row>
      <Row
        style={{ height: "100%", marginTop: "4vh" }}
        align="bottom"
        gutter={[48, 48]}
      >
        <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ margin: "auto" }}>
          <div className="car-chart-1">
            <Chart
              type={"bar"}
              data={{
                labels: getSevenDaysBefore(),
                datasets: [
                  {
                    label: "Quãng đường xe đi được từng ngày trong 7 ngày",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                    borderColor: ["rgb(54, 162, 235)"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Quãng Đường (km)",
                    },
                  },
                },
              }}
            />
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ margin: "auto" }}>
          <div className="car-chart-2">
            <Chart
              type={"bar"}
              data={{
                labels: getSevenDaysBefore(),
                datasets: [
                  {
                    label: "Thời gian chạy từng ngày trong 7 ngày",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                    borderColor: ["rgb(54, 162, 235)"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Thời gian (phút)",
                    },
                  },
                },
              }}
            />
          </div>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ margin: "auto" }}>
          <div className="car-chart-3">
            <Chart
              type={"pie"}
              data={{
                labels: [
                  "Tổng thời gian chạy (giờ)",
                  "Tổng thời gian rảnh (giờ)",
                ],
                datasets: [
                  {
                    label: "Tổng thời gian xe chạy trong 7 ngày",
                    data: [300, 50],
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetailInfoCarBox;
