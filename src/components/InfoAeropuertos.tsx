import { Box, Typography } from "@mui/material";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Report } from "../interfaces";
import { Info } from "./Info";

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
                            <Info report={report} />
                        </Box>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
