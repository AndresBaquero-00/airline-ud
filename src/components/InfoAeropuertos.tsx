import { Box, Typography } from "@mui/material";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Report } from "../interfaces";

type Props = {
    show: boolean;
    reports: Report[]
}

export const InfoAeropuertos = ({ show, reports }: Props) => {
    return (
        <Swiper 
            navigation
            className="swiper-segmentos"
            modules={[Navigation]} 
            style={{ display: show ? 'block':'none' }}
        >
            {
                reports.map((report, index) => (
                    <SwiperSlide 
                        key={index}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '500px',
                                margin: '15px auto',
                                height: '100%',
                            }}
                        >
                            <Typography>
                                <strong>Vuelo: &nbsp;</strong>
                                {report.flight}
                            </Typography>
                            <Typography>
                                <strong>Aerolínea: &nbsp;</strong>
                                {report.airline}
                            </Typography>
                            <Typography>
                                <strong>Aeropuerto: &nbsp;</strong>
                                {report.airport}
                            </Typography>
                            <Typography>
                                <strong>{report.city.type}: &nbsp;</strong>
                                {report.city.name}
                            </Typography>
                            <Typography>
                                <strong>{report.division.type}: &nbsp;</strong>
                                {report.division.name}
                            </Typography>
                            <Typography>
                                <strong>{report.country.type}: &nbsp;</strong>
                                {report.country.name}
                            </Typography>
                            <Typography>
                                <strong>Fecha: &nbsp;</strong>
                                {report.date}
                            </Typography>
                            <Typography>
                                <strong>Piloto: &nbsp;</strong>
                                {report.pilot}
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
